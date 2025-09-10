
export function convertToCsv(data: Record<string, any>[] = []){
    const headers = Object.keys(data[0]).join(",") + "\n"
    const rows = data.map(obj => Object.values(obj).join(",")).join("\n")
    return headers + rows
}

export function downloadCsv(filename: string, csvContent: string) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}