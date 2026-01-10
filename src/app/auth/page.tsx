import AuthContainer from '@/components/auth/auth-container';

export default function AuthPage({
  searchParams,
}: {
  searchParams: { mode?: string };
}) {
  return <AuthContainer mode={searchParams.mode ?? 'login'} />;
}
