import { useState } from 'react';
import { GiClothes } from 'react-icons/gi';
import { IoBody } from 'react-icons/io5';
import { changeStyleButton } from '@/utils/styleUtils';

const MenuTypeItems = () => {
  const menus = [
    { name: 'Clothes', component: <GiClothes className="w-10 h-10" /> },
    { name: 'Body', component: <IoBody className="w-10 h-10" /> },
  ];
  const [typeMenu, setTypeMenu] = useState('Clothes');
  return (
    <div className="ml-10">
      {menus.map(({ component, name }, i) => (
        <button
          className={`bg-gray-500 hover:bg-gray-400 border-l-4 border-gray-700 hover:border-gray-500 ${
            name === 'Clothes' ? 'rounded-tl-lg' : 'rounded-bl-lg -mt-1.5'
          } ${changeStyleButton(name, typeMenu)} my-0 p-0`}
          onClick={() => setTypeMenu(name)}
        >
          {component}
        </button>
      ))}
    </div>
  );
};

export default MenuTypeItems;
