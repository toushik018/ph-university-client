import { TQueryParam, TResponseRedux } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesters: builder.query({
            query: (args) => {
                const params = new URLSearchParams()
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/academic-semesters',
                    method: 'GET',
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                };
            },

            providesTags: ["academic-management"]
        }),
        addAcademicSemester: builder.mutation({
            query: (data) => ({
                url: '/academic-semesters/create-academic-semester',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["academic-management"]
        }),
        addAcademicFaculty: builder.mutation({
            query: (data) => ({
                url: '/academic-faculties/create-academic-faculty',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["academic-management"]
        }),
        getAllAcademicFaculties: builder.query({
            query: () => {
                return {
                    url: '/academic-faculties',
                    method: 'GET',
                }
            },
            transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                };
            },
            providesTags: ["academic-management"]
        }),

        addAcademicDepartment: builder.mutation({
            query: (data) => ({
                url: '/academic-departments/create-academic-department',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["academic-management"]
        }),
        getAllDepartments: builder.query({
            query: () => {
                return {
                    url: '/academic-departments',
                    method: 'GET',
                }
            },
            transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                };
            },
            providesTags: ["academic-management"]
        }),
    })
})

export const {
    useGetAllSemestersQuery,
    useAddAcademicSemesterMutation,
    useAddAcademicFacultyMutation,
    useGetAllAcademicFacultiesQuery,
    useAddAcademicDepartmentMutation,
    useGetAllDepartmentsQuery
} = academicManagementApi;