const currency = (amount: string) => {
  const cleanNumber = amount.replace(
    /Rp\s*([\-\d\,\.]+)([MK])/g,
    (_match, p1, p2) => {
      const number = p1.replace(/,/g, ".");

      return (
        Number(number) * (p2 === "M" ? 1e6 : p2 === "K" ? 1e3 : 1)
      ).toString();
    }
  );

  return Number(cleanNumber).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

export default currency;
