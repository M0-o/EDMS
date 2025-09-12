import { toast } from "sonner";
import { useStudentService } from "@/services/studentService";
import {fromCsv} from "@/utils/importFromCsv"
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function CSVInput(){
    const studentService = useStudentService();
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    async function handleImport(e){
        const file = e.target.files?.[0];
        if(!file) return;

        const data = await fromCsv(file);
        if(!data) return;

        

       for(const row of data){
            await toast.promise(
                    studentService.create(row).then((res) => {
                        console.log("Response:", res); // Debug: Check response
                        if (res.status && res.status !== 200) {
                            throw new Error(res.detail || 'Bad request');
                        } else return res;
                    }),
                    {
                        loading: "Registering student...",
                        success: () => {
                            return (
                                <div className="mt-2 space-y-1">
                                    <p>
                                        <strong>
                                            {row.first_name} {row.last_name}
                                        </strong>
                                    </p>
                                    <p>CNE: {row.cne}</p>
                                    <p>Apogee: {row.apogee}</p>
                                    {row.email && <p>Email: {row.email}</p>}
                                </div>
                            );
                        },
                        error: (err) => {
                            console.error("Error details:", err); // Debug: Check error details
                            return `Error: ${err.message}`;
                        },
                    }
                );
            
        }
        navigate(0)
    }
         
    return (<>
       
        <Input
            ref={inputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleImport}
        />
        <Button onClick={() => inputRef.current?.click()} variant="link" > Import from CSV</Button>
    </>);
}