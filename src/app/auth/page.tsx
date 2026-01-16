import AuthContainer from '@/components/auth/auth-container';

type AuthPageProps = {
  searchParams: Promise<{
    mode?: string;
  }>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const params = await searchParams;

  return <AuthContainer mode={params.mode ?? 'login'} />;
}
