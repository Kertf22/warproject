
export const setRelatorio = (relatorio) => localStorage.setItem('relatorio',JSON.stringify(relatorio));

export const getRelatorio = () => JSON.parse(localStorage.getItem('relatorio'));