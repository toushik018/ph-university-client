import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/AcademicSemesterApi";

const AcademicSemester = () => {

  const {data} = useGetAllSemestersQuery(undefined)
  console.log(data);

  return (
    <div>
        <h1>This is AcademicSemester</h1>
    </div>
  );
};

export default AcademicSemester;