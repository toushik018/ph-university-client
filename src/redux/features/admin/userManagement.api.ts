import { TQueryParam, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudents: builder.query({
            query: (args) => {
                const params = new URLSearchParams()
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/students',
                    method: 'GET',
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<TStudent[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                };
            },
            providesTags: ["user-management"],
        }),
        addStudent: builder.mutation({
            query: (data) => ({
                url: '/users/create-student',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["user-management"],
        }),
        changeUserStatus: builder.mutation({
            query: ({ status, userId }) => {
                console.log("Mutation parameters:", { status, userId });
                return {
                    url: `/users/change-status/${userId}`,
                    method: "POST",
                    body: { status },
                };
            },
            invalidatesTags: ["user-management"],
        }),
        getSingleStudent: builder.query({
            query: (id) => {
                console.log(id);
                return {
                    url: `students/${id}`,
                    method: "GET",
                }
            },
        }),

        addAdmin: builder.mutation({
            query: (data) => ({
                url: '/users/create-admin',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["user-management"],
        }),

        getAllAdmins: builder.query({
            query: (args) => {
                const params = new URLSearchParams()
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/admins',
                    method: 'GET',
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<TStudent[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                };
            },

        }),
        getSingleAdmin: builder.query({
            query: (id) => {
                return {
                    url: `admins/${id}`,
                    method: "GET",
                }
            },
        }),

        addFaculty: builder.mutation({
            query: (data) => ({
                url: '/users/create-faculty',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["user-management"],
        }),

        getAllFaculties: builder.query({
            query: (args) => {
                const params = new URLSearchParams()
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/faculties',
                    method: 'GET',
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<TStudent[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                };
            },

        }),

        getSingleFaculty: builder.query({
            query: (id) => {
                return {
                    url: `faculties/${id}`,
                    method: "GET",
                }
            },
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["user-management"],
        }),

    }),
});

export const { useAddStudentMutation,
    useGetAllStudentsQuery,
    useChangeUserStatusMutation,
    useGetSingleStudentQuery,
    useAddAdminMutation,
    useGetAllAdminsQuery,
    useGetSingleAdminQuery,
    useAddFacultyMutation,
    useGetAllFacultiesQuery,
    useGetSingleFacultyQuery,
    useChangePasswordMutation
} = userManagementApi;