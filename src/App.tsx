import MainLayout from "./component/layout/MainLayout";
import ProtectedRoute from "./component/layout/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  );
}

export default App;
