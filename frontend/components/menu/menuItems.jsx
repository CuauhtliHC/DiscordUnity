import { useState } from 'react';
import { changeStyleButton } from '@/utils/styleUtils';
import CardItem from '@/commons/menu/cardItems';

const MenuItems = () => {
  const [typeItems, setTypeItems] = useState('Glasses');
  const items = ['Glasses', 'Shirt', 'Jacket', 'Pants', 'Shoes'];
  return (
    <div className="bg-gray-800 bg-opacity-50 flex flex-col sm:p-10 sm:rounded-r-2xl sm:rounded-bl-2xl 2xl:h-[50rem] xl:h-[40rem] lg:h-[30rem] h-[30rem]">
      <div className="flex-1 px-2 sm:px-0">
        <div className="flex justify-between items-center">
          <div className="inline-flex">
            {items.map((itemType, i) => (
              <button
                className={`${changeStyleButton(
                  itemType,
                  typeItems,
                )} hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded`}
                key={i}
                onClick={() => setTypeItems(itemType)}
              >
                {itemType}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-10 sm:mb-0 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-[50px] mt-5">
          <CardItem />
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
