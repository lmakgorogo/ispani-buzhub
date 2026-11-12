import React, { createContext, useContext } from 'react';

interface CurrencyContextType {
  formatMoney: (amountInZar: number, decimals?: number) => string;
  currencySymbol: string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  formatMoney: (amountInZar: number, decimals: number = 0) => {
    return `R${amountInZar.toLocaleString('en-ZA', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })}`;
  },
  currencySymbol: 'R'
});

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const formatMoney = (amountInZar: number, decimals: number = 0): string => {
    return `R${amountInZar.toLocaleString('en-ZA', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ formatMoney, currencySymbol: 'R' }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
