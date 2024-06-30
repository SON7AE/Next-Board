"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/utils/supabase";
// COMPONENTS
import LabelCalendar from "@/components/common/calendar/LabelCalendar";
import BasicBoard from "@/components/common/board/BasicBoard";
// Shadcn UI
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft } from "lucide-react";
// CSS
import styles from "./page.module.scss";

interface BoardContent {
    isCompleted: boolean;
    title: string;
    stateDate: string;
    endDate: string;
    content: string;
}

function page() {
    const router = useRouter();
    const pathname = usePathname();
    const [todo, setTodo] = useState<any>();
    const [boards, setBoards] = useState<BoardContent[]>([]);
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());
    const { toast } = useToast();

    const insertRowData = async (contents: BoardContent[]) => {
        // Supabase 데이터베이스에 연동

        const { data, error, status } = await supabase
            .from("todos")
            .upsert({ id: pathname.split("/")[2], contents: JSON.stringify(contents) })
            .select();

        if (error) {
            console.log(error);
            toast({
                title: "에러가 발생했습니다.",
                description: "콘솔 창에 출력된 에러를 확인하세요.",
            });
        }
        if (status === 201) {
            toast({
                title: "생성 완료!",
                description: "새로운 TO DO BOARD가 생성되었습니다.",
            });
        }
    };
    const createBoard = () => {
        const newBoards = [];
        const boardContent = {
            isCompleted: false,
            title: "",
            stateDate: "",
            endDate: "",
            content: "",
        };
        newBoards.push(boardContent);
        setBoards(newBoards);
        insertRowData(newBoards);
    };

    // ====================================================================================================

    // Supabase에 기존에 생성된 페이지가 있는지 없는지 확인
    const getData = async () => {
        let { data: todos, error } = await supabase.from("todos").select("*");
        console.log(todos);

        if (todos !== null) {
            let res = {};

            todos.forEach((item: any) => {
                if (item.id === Number(pathname.split("/")[2])) {
                    res = item;
                }
            });
            setTodo(res);
        }
        return todos;
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={styles.container}>
            <div className="absolute top-6 left-7 flex items-center gap-2">
                <Button variant={"outline"} size={"icon"} onClick={() => router.back()}>
                    <ChevronLeft />
                </Button>
                <Button variant={"outline"}>Save</Button>
            </div>
            <header className={styles.container__header}>
                <div className={styles.container__header__contents}>
                    <input type="text" placeholder="Enter Title Here" className={styles.input} />
                    <div className={styles.progressBar}>
                        <span className={styles.progressBar__status}>0/10 completed</span>
                        {/* 프로그레스 바 UI */}
                        <Progress value={33} className="w-[30%] h-2" indicatorColor="bg-green-500" />
                    </div>
                    <div className={styles.calendarBox}>
                        <div className={styles.calendarBox__calendar}>
                            {/* 캘린더 UI */}
                            <LabelCalendar label="From" handleDate={setStartDate} />
                            <LabelCalendar label="To" handleDate={setEndDate} />
                        </div>
                        <Button
                            variant={"outline"}
                            className="w-[15%] border-orange-500 bg-orange-400 text-white hover:bg-orange-400 hover:text-white"
                            onClick={createBoard}
                        >
                            Add New Board
                        </Button>
                    </div>
                </div>
            </header>
            <main className={styles.container__body}>
                {!boards ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <div className={styles.container__body__infoBox}>
                            <span className={styles.title}>There is no board yet.</span>
                            <span className={styles.subTitle}>Click the button and start flashing!</span>
                            <button className={styles.button}>
                                <Image src="/assets/images/round-button.svg" alt="round-button" width={100} height={100} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-start w-full h-full gap-4">
                        {boards.map((board: BoardContent) => {
                            return <BasicBoard key={board.title} />;
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

export default page;
