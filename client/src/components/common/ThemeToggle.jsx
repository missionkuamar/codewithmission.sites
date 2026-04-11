import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/slices/uiSlice';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.ui);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <FiSun className="text-yellow-500" size={20} />
      ) : (
        <FiMoon className="text-gray-700" size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;