import { FaEdit, FaTrash } from "react-icons/fa";
import { useAllMenu } from "../../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import {
  confirmAction,
  errorAction,
  successAction,
} from "../../../../utils/swal";
import PageLoader from "../../../components/PageLoader/PageLoader";
import DataTable from "../../../components/DataTable/DataTable";

const ManageItems = () => {
  const { data: menuItems = [], isPending, refetch } = useAllMenu();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleDeleteMenuItem = async (menuItem) => {
    const isConfirmed = await confirmAction({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      confirmText: "Yes, confirm",
    });

    if (!isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`menu/${menuItem._id}`);
      if (res.data.deletedCount > 0) {
        refetch();
        await successAction(`${menuItem.name} has been deleted!`);
      }
    } catch (err) {
      await errorAction(err.response?.data?.message || err.message);
    }
  };

  if (isPending) return <PageLoader />;

  return (
    <section className="w-full max-w-full">
      <SectionTitle title="manage all items" subTitle="Hurry Up!" />

      <DataTable
        title="Total Items"
        len={menuItems.length}
        columns={[
          "#",
          "Item Image",
          "Item Name",
          "Price",
          "Action",
          "Action",
        ]}
        isLoading={isPending}
      >
        {menuItems.map((menuItem, idx) => (
          <tr key={menuItem._id}>
            <td className="font-bold whitespace-nowrap">{idx + 1}</td>

            <td>
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12 sm:h-16 sm:w-16">
                  <img
                    src={menuItem.image}
                    alt={menuItem.name}
                    className="object-cover"
                  />
                </div>
              </div>
            </td>

            <td className="whitespace-nowrap">{menuItem.name}</td>

            <td className="whitespace-nowrap">{menuItem.price}</td>

            <td>
              <button
                onClick={() =>
                  navigate(`/dashboard/admin/update-item/${menuItem._id}`)
                }
                className="btn btn-sm bg-primary hover:bg-orange-600 text-white"
              >
                <FaEdit />
              </button>
            </td>

            <td>
              <button
                onClick={() => handleDeleteMenuItem(menuItem)}
                className="btn btn-sm btn-secondary"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </DataTable>
    </section>
  );
};

export default ManageItems;
