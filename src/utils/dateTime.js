export const timeString = ( dtObj ) => {
    return dtObj.toLocaleString().match(/[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/g)
}