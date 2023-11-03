"use client";
import DashboardGrid from "@/components/DashBoard/DashBoardGrid";
import { useGetStageQuery } from "@/store/apis/CantajuegaApi";

export default function Page() {
  const { data: stages, isLoading,isError } = useGetStageQuery({childs:true});
  if (isLoading) {
    return (
      <>
        <div className=" min-h-[20rem] flex justify-center items-center">
          <h1 className="text-2xl">soy un loader xd.....</h1>
        </div>
      </>
    );
  }
  if(isError){
    return(

      <>
        <div className=" min-h-[20rem] flex justify-center items-center">
          <h1 className="text-2xl"> Algo salio mal mi rey.....</h1>
        </div>
      </>
    )
  }
  return (
    <>
      <h1>Cursoos</h1>
      <DashboardGrid
        numberOfColumns={6}
        numberOfLinks={8}
        column1={{
          data: stages?.data!,
          title: "nombres",
          dataProperty: "name" as keyof object,
        }}
        column2={{
          data: stages?.data!,
          title: "descripcion",
          dataProperty: "description" as keyof object,
        }}
        column3={{
          data: stages?.data!,
          title: "Edad min",
          dataProperty: "minAge" as keyof object,
        }}
        column4={{
          data: stages?.data!,
          title: "Edad max",
          dataProperty: "maxAge" as keyof object,
        }}
        columnOfTotal={{
          title:'Total alumnos',
          data:stages?.data!,
          dataProperty:'Childrens' as keyof object
        }}
      />
    </>
  );
}