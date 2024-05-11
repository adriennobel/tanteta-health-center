const TODAY = new Date();
const TODAY_ISODATE = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).toISOString().split('T')[0];

export { TODAY, TODAY_ISODATE }