export const displayMoney = (n) => {
    const format = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'try'
    });
  
    return format.format(n);
  };