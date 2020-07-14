const thousands = (x, sep = " ") => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
};

export default thousands;
