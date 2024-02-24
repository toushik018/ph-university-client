import { TAcademicSemester } from "./academicManagement.types"

export type TSemester = {
    _id: string;
    academicSemester: TAcademicSemester
    status: string
    startDate: string
    endDate: string
    minCredit: number
    maxCredit: number
    createdAt: string
    updatedAt: string
}
