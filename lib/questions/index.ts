import { MTH101 } from './mth101'
import { PHY101 } from './phy101'
import { CHE101 } from './che101'
import { BIO101 } from './bio101'
import { GST101 } from './gst101'
import { CSC101 } from './csc101'

export const questionBank: Record<string, any[]> = {
  'MTH 101': MTH101,
  'PHY 101': PHY101,
  'CHE 101': CHE101,
  'BIO 101': BIO101,
  'GST 101': GST101,
  'CSC 101': CSC101,
}

export const courses = [
  { code: 'MTH 101', name: 'Elementary Mathematics I', color: 'bg-blue-500' },
  { code: 'PHY 101', name: 'General Physics I', color: 'bg-purple-500' },
  { code: 'CHE 101', name: 'General Chemistry I', color: 'bg-green-500' },
  { code: 'BIO 101', name: 'General Biology I', color: 'bg-emerald-500' },
  { code: 'GST 101', name: 'Use of English I', color: 'bg-orange-500' },
  { code: 'CSC 101', name: 'Introduction to Computer Science', color: 'bg-red-500' },
]
