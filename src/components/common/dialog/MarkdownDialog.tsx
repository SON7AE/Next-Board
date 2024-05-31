import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import MDEditor from '@uiw/react-md-editor'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import LabelCalendar from '@/components/common/calendar/LabelCalendar'
// CSS
import styles from './MarkdownDialog.module.scss'

function MarkdownDialog() {
    const [contents, setContents] = useState<string | undefined>('**Hello world!!!**')
    const [startDate, setStartDate] = useState<Date | undefined>()
    const [endDate, setEndDate] = useState<Date | undefined>()

    const setDate = (payload: { label: string; date: Date | undefined }) => {
        if (payload.label === 'From') setStartDate(payload.date)
        else setEndDate(payload.date)
    }

    // Supabase에 저장
    const save = async () => {
        // Required Params
        let params = {
            startData: startDate,
            endDate: endDate,
            contents: contents,
        }

        const { data, error, status } = await supabase.from('views').insert({
            board_contents: params,
        })

        if (status === 201) {
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <span className='font-normal text-gray-400 hover:text-gray-500'>Add Contents</span>
            </DialogTrigger>
            <DialogContent className='max-w-fit'>
                <DialogHeader>
                    <DialogTitle>
                        <div className={styles.dialog__titleBox}>
                            <Checkbox className='w-5 h-5' />
                            <span className={styles.dialog__titleBox__title}>Development Environment Settin</span>
                        </div>
                    </DialogTitle>
                    <div className={styles.dialog__calendarBox}>
                        <LabelCalendar label='From' handleDate={setDate} />
                        <LabelCalendar label='To' handleDate={setDate} />
                    </div>
                    <div className={styles.dialog__line}></div>
                    <div data-color-mode='light' className={styles.dialog__markdown}>
                        <MDEditor value={contents} height={100 + '%'} onChange={setContents} />
                    </div>
                    <div className={styles.dialog__buttonBox}>
                        <Button variant='ghost' className='font-normal text-gray-400 hover:bg-gray-50 hover:text-gray-500'>
                            Cancel
                        </Button>
                        <Button className='font-normal border-orange-500 bg-orange-400 text-white hover:bg-oragne-400 hover:text-white' onClick={save}>
                            Done
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default MarkdownDialog
