import { useAuth } from "@clerk/clerk-react";

export function useDocumentService() {

  const { getToken } = useAuth();

  async function downloadDocument(
    downloadUrl: string,
    originalFileName: string
  ) {
    const token = await getToken();
    const doc = await fetch(downloadUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const blob = await doc.blob();
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", originalFileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  return { downloadDocument };
}
