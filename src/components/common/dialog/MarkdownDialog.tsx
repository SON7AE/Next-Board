import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import LabelCalendar from '@/components/common/calendar/LabelCalendar'
// CSS
import styles from './MarkdownDialog.module.scss'

function MarkdownDialog() {
    const [value, setValue] = useState<string | undefined>('**Hello world!!!**')

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
                        <LabelCalendar label='From' />
                        <LabelCalendar label='To' />
                    </div>
                    <div className={styles.dialog__line}></div>
                    <div data-color-mode='light' className={styles.dialog__markdown}>
                        <MDEditor value={value} height={100 + '%'} onChange={setValue} />
                    </div>
                    <div className={styles.dialog__buttonBox}>
                        <Button variant='ghost' className='font-normal text-gray-400 hover:bg-gray-50 hover:text-gray-500'>
                            Cancel
                        </Button>
                        <Button className='font-normal border-orange-500 bg-orange-400 text-white hover:bg-oragne-400 hover:text-white'>Done</Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default MarkdownDialog
