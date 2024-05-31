"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import styles from "./LabelCalendar.module.scss";

interface Emit {
    label: string;
    date: Date | undefined;
}

interface Props {
    label: string;
    data?: Date;
    readOnly?: boolean;
    handleDate?: (emit: Emit) => void | undefined;
}

function LabelCalendar({ label, data, readOnly, handleDate }: Props) {
    const [date, setDate] = useState<Date>();

    useEffect(() => {
        if (data) setDate(data);
        const emit = {
            label,
            date,
        };
        handleDate?.(emit);
    }, [date]);

    return (
        <div className={styles.container}>
            <span className={styles.container__label}>{label}</span>
            {/* DATE PICKER UI */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-[200px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                {!readOnly && (
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                )}
            </Popover>
        </div>
    );
}

export default LabelCalendar;
