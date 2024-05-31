import { useState } from "react";
import { supabase } from "@/lib/supabase";
import MDEditor from "@uiw/react-md-editor";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import LabelCalendar from "@/components/common/calendar/LabelCalendar";
// CSS
import styles from "./MarkdownDialog.module.scss";

function MarkdownDialog() {
    const [open, setOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [contents, setContents] = useState<string | undefined>("**Hello world!!!**");
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    const { toast } = useToast();

    const setDate = (payload: { label: string; date: Date | undefined }) => {
        if (payload.label === "From") setStartDate(payload.date);
        else setEndDate(payload.date);
    };

    // ====================================================================================================

    // Supabase에 저장
    const onSubmit = async () => {
        if (!title || !startDate || !endDate || !contents) {
            toast({
                variant: "destructive",
                title: "기입되지 않은 데이터가 있습니다.",
                description: "제목, 날짜 혹은 콘텐츠 데이터를 모두 작성해주세요.",
            });
            return;
        } else {
            // Required Params
            let params = {
                title: title,
                startDate: startDate,
                endDate: endDate,
                contents: contents,
            };

            const { data, error, status } = await supabase.from("views").insert({
                board_contents: params,
            });

            if (error) console.log(error);
            if (status === 201) {
                setOpen(false);
                toast({
                    description: "작성한 데이터가 Supabase에 올바르게 저장되었습니다.",
                });
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <span className="font-normal text-gray-400 hover:text-gray-500 cursor-pointer">Add Contents</span>
            </DialogTrigger>
            <DialogContent className="max-w-fit">
                <DialogHeader>
                    <DialogTitle>
                        <div className={styles.dialog__titleBox}>
                            <Checkbox className="w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Write a title for your board."
                                className={styles.dialog__titleBox__title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                    </DialogTitle>
                    <div className={styles.dialog__calendarBox}>
                        <LabelCalendar label="From" handleDate={setDate} />
                        <LabelCalendar label="To" handleDate={setDate} />
                    </div>
                    <div className={styles.dialog__line}></div>
                    <div data-color-mode="light" className={styles.dialog__markdown}>
                        <MDEditor value={contents} height={100 + "%"} onChange={setContents} />
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <div className={styles.dialog__buttonBox}>
                        <DialogClose asChild>
                            <Button variant="ghost" className="font-normal text-gray-400 hover:bg-gray-50 hover:text-gray-500">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="font-normal border-orange-500 bg-orange-400 text-white hover:bg-oragne-400 hover:text-white"
                            onClick={onSubmit}
                        >
                            Done
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default MarkdownDialog;
