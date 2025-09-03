import { Templates } from '../constants/templates';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { findTemplates } from '../data/templates';

export const useTemplate = (uuid) => {
  const { pathname } = useLocation();
  const { data } = useQuery(
    [
      'templates-find',
      Templates.map((template) => template.uuid),
    ],
    findTemplates,
  );

  const template =
    Templates.find((template) => template.uuid === uuid)
    || Templates.find((template) => pathname.includes(template.path));
  return {
    template,
    data,
  };
};