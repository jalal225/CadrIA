'use client';

interface PricingButtonProps {
  planId: string;
  label: string;
  highlighted?: boolean;
}

export default function PricingButton({ planId, label, highlighted }: PricingButtonProps) {
  const handleSubscribe = async () => {
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (data.requireAuth) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de la création de la session de paiement');
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors mb-6 ${
        highlighted
          ? 'bg-blue-600 hover:bg-blue-700 text-white'
          : 'bg-slate-700 hover:bg-slate-600 text-white'
      }`}
    >
      {label}
    </button>
  );
}
