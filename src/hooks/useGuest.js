import { getGuest } from '../data/guest';
import useQueryParams from './useQueryParams';
import { useQuery } from '@tanstack/react-query';

const useGuest = ({
  defaultGuest = {
    uuid: null,
    wedding_id: null,
    name: 'Tamu Undangan',
  },
} = {}) => {
  const guestId = useQueryParams().get('guest_id');
  const query = useQuery(
    ['guest', guestId],
    getGuest,
    {
      initialData: {
        data: defaultGuest,
      },
      enabled: !!guestId,
      select: (guest) => guest.data,
    },
  );
  return query;
};

export default useGuest;