import { head } from "lodash";

export function fromCsv(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const headers = text.slice(0, text.indexOf("\n")).split(",").map(header => header.trim());
                const rows = text.split("\r\n").slice(1).map(row => {
                    const values = row.split(",");
                    return headers.reduce((acc, header, index) => {
                        acc[header] = values[index];
                        return acc;
                    }, {} as any);
                });
                resolve(rows);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = () => reject(reader.error);
    });
}