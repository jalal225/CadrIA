export const BRAND = {
  name: 'Solveria',
  displayName: 'Solveria',
  tagline: 'Votre IA, installée et en règle.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://ia.fr',
  email: 'contact@ia.fr',
  legalNotice: 'Information et aide à la mise en œuvre. Ne constitue pas une consultation juridique et ne garantit pas la conformité de l\'entreprise.',
  plans: [
    {
      id: 'essential',
      name: 'Essentielle',
      monthlyPrice: 49,
      yearlyPrice: 490,
    },
    {
      id: 'premium',
      name: 'Premium',
      monthlyPrice: 149,
      yearlyPrice: 1490,
    },
  ],
};
