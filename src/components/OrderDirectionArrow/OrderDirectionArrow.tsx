import { IconArrowsTransferDown, IconArrowsTransferUp  } from '@tabler/icons-react';

const OrderDirectionArrow = ({ onClick, ascending }: { onClick: () => void; ascending: boolean }) => {
  return (
    <button onClick={onClick} className="ml-4 bg-gray-100 p-1 rounded text-gray-400 hover:text-gray-500">
      {ascending ? <IconArrowsTransferUp /> : <IconArrowsTransferDown />}
    </button>
  )
}

export default OrderDirectionArrow