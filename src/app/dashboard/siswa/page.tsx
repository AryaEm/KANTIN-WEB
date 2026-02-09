'use client';

import { useState, useEffect, useRef } from 'react';

import SiswaHeader from '@/components/dashboard/siswa/siswa-header';
import SiswaTabs from '@/components/dashboard/siswa/siswa-tabs';
import { getCookie } from '@/lib/client-cookie';
import axios from 'axios';
import { post } from '@/lib/api-bridge';
import StanView from '@/components/dashboard/siswa/stan-view';
import HistoryView from '@/components/dashboard/siswa/history-view';
import CartView from '@/components/dashboard/siswa/cart-view';
import OrderView from '@/components/dashboard/siswa/order-view';
import { StudentNavbar } from '@/components/dashboard/siswa/siswa-navbar';
import { toast } from 'react-toastify';
import CustomToast from '@/components/ui/CustomToast';
import { CartItem, Menu } from '@/app/types';
import { loadCart, saveCart, clearCart } from "@/lib/cart-cookie";
import PaymentQRModal from '@/components/dashboard/siswa/payment-qr-modal';
import { PaymentMethod } from '@/components/dashboard/siswa/payment-method-selector';

export type SiswaTab =
  | 'stan'
  | 'keranjang'
  | 'pesanan'
  | 'riwayat';

type OrderResponse = {
  order_id: number;
};

interface OrderPayload {
  items: {
    id_menu: number;
    qty: number;
  }[];
}

export default function SiswaDashboardPage() {
  const [activeTab, setActiveTab] = useState<SiswaTab>('stan');
  const [cart, setCart] = useState<CartItem[]>(() => loadCart());
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('qris');
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<number | undefined>();
  const [totalAmount, setTotalAmount] = useState(0);
  
  // Flag untuk mencegah toast duplikat
  const toastShownRef = useRef(false);

  const addToCart = (menu: Menu) => {
    setCart(prev => {
      if (prev.length > 0 && prev[0].stan_id !== menu.id_stan) {
        return prev
      }

      const exist = prev.find(i => i.id_menu === menu.id)

      const diskon = menu.discount ?? 0
      const hargaSetelahDiskon =
        diskon > 0
          ? menu.price - (menu.price * diskon) / 100
          : menu.price

      if (exist) {
        return prev.map(i =>
          i.id_menu === menu.id
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }

      return [
        ...prev,
        {
          id_menu: menu.id,
          stan_id: menu.id_stan,
          nama_menu: menu.name,
          foto: menu.image ?? null,
          harga_asli: menu.price,
          harga_setelah_diskon: hargaSetelahDiskon,
          diskon_persen: diskon,
          qty: 1,
        },
      ]
    })

    setTimeout(() => {
      setCart(prev => {
        if (prev.length > 0 && prev[0].stan_id !== menu.id_stan) {
          toast(
            <CustomToast
              type="warning"
              message="Satu transaksi hanya boleh dari satu stan"
            />,
            {
              containerId: "toastOrder",
              className: "bg-yellow-400 rounded-xl shadow-lg",
              icon: false,
            }
          )
        }
        return prev
      })
    }, 0)
  }

  const updateCartQuantity = (menuId: number, newQty: number) => {
    if (newQty === 0) {
      setCart(prev => prev.filter(item => item.id_menu !== menuId));
    } else {
      setCart(prev => 
        prev.map(item => 
          item.id_menu === menuId 
            ? { ...item, qty: newQty } 
            : item
        )
      );
    }
  };

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const handleCheckout = async () => {
    if (cart.length === 0 || isCheckingOut) return;

    const token = getCookie('token');
    if (!token) return;

    setIsCheckingOut(true);
    // Reset flag saat mulai checkout baru
    toastShownRef.current = false;

    // Calculate total
    const total = cart.reduce(
      (sum, item) => sum + item.harga_setelah_diskon * item.qty,
      0
    );
    setTotalAmount(total);

    // Payload HANYA berisi items, TIDAK ADA payment_method
    const payload: OrderPayload = {
      items: cart.map(item => ({
        id_menu: item.id_menu,
        qty: item.qty,
      })),
    };

    try {
      const res = await post<OrderResponse>('/order', payload, token);

      if (!res.status) {
        toast(
          <CustomToast
            type="warning"
            message={res.message ?? "Terjadi kesalahan"}
          />,
          {
            containerId: "toastOrder",
            className: "bg-yellow-400 rounded-xl shadow-lg",
            icon: false,
          }
        );
        setIsCheckingOut(false);
        return;
      }

      // Set order ID and show QR modal
      setCurrentOrderId(res.data?.order_id);
      setShowQRModal(true);

      // Clear cart
      setCart([]);
      clearCart();

    } catch (err: unknown) {
      let message = "Terjadi kesalahan server";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message ?? err.message;
      }

      toast(
        <CustomToast type="error" message={message} />,
        {
          containerId: "toastOrder",
          className:
            "bg-red-400 border border-white/10 rounded-xl shadow-xl",
          icon: false,
        }
      );
      setIsCheckingOut(false);
    }
  };

  const handleCloseQRModal = () => {
    setShowQRModal(false);
    setIsCheckingOut(false);
    setActiveTab('pesanan');
    
    // Cek flag sebelum show toast
    if (!toastShownRef.current) {
      toastShownRef.current = true; // Set flag
      
      toast(
        <CustomToast type="success" message="Transaksi berhasil" />,
        {
          containerId: "toastOrder",
          className: "p-0 bg-transparent shadow-none",
          icon: false,
          autoClose: 1500,
        }
      );
    }
  };

  return (
    <>
      <StudentNavbar />
      <section className="pb-8 pt-24 lg:px-40 px-4 bg-gradient-to-br from-orange-50 via-yellow-50 to-white min-h-screen relative overflow-hidden">
        <div className="absolute -top-20 -right-[2%] w-[400px] h-[400px] bg-yellow-300 dashboard-blob-1 opacity-10"></div>

        <SiswaHeader />

        <SiswaTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-8">
          {activeTab === 'stan' && (
            <StanView 
              addToCart={addToCart}
              cart={cart}
              updateCartQuantity={updateCartQuantity}
            />
          )}

          {activeTab === 'keranjang' && (
            <CartView
              cart={cart}
              setCart={setCart}
              onCheckout={handleCheckout}
              loading={isCheckingOut}
              selectedPaymentMethod={selectedPaymentMethod}
              onPaymentMethodChange={setSelectedPaymentMethod}
            />
          )}

          {activeTab === 'pesanan' && <OrderView />}

          {activeTab === 'riwayat' && <HistoryView />}
        </div>
      </section>

      {/* Payment QR Modal */}
      <PaymentQRModal
        isOpen={showQRModal}
        onClose={handleCloseQRModal}
        paymentMethod={selectedPaymentMethod}
        totalAmount={totalAmount}
        orderId={currentOrderId}
      />
    </>
  );
}