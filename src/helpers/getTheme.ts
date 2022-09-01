export const getTheme = (hour: number) => {
    if (hour > 5 && hour <= 11) {
        return `morning`
    }
    if (hour > 11 && hour <= 16) {
        return `afternoon`
    }
    if (hour > 16 && hour <= 20) {
        return `evening`
    }
    if (hour > 20 && hour <= 24 || hour >= 0 && hour <= 5) {
        return `night`
    }
    return `idle`
}