import { Layout, Menu } from "antd";
import { adminPaths } from "../../routes/admin.routes";
import { sideBarItemGenerator } from "../../utils/sideBarItemsGenerator";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
const { Sider } = Layout;

const Sidebar = () => {
  const role = "faculty";
  let sidebarItems;

  const userRole = {
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student",
  };

  switch (role) {
    case userRole.ADMIN:
     sidebarItems= sideBarItemGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems= sideBarItemGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems= sideBarItemGenerator(studentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PH Uni</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
