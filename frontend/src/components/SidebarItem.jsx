const SidebarItem = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition
        ${active
          ? "bg-black text-white"
          : "text-gray-700 hover:bg-gray-200"
        }`}
    >
      {label}
    </button>
  )
}

export default SidebarItem
