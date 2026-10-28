import { ContactItem } from '@/feature/contacts/types/contacts.types';

export const INITIAL_CONTACTS: ContactItem[] = [
  {
    code: 'MESHY-A1B2C3D4',
    name: 'Ana',
    priority: 1,
    trusted: true,
    qrVerified: true,
  },
  {
    code: 'MESHY-E5F6A7B8',
    name: 'Leo',
    priority: 2,
    trusted: true,
    qrVerified: true,
  },
  {
    code: 'MESHY-C9D0E1F2',
    name: 'Mar',
    priority: 3,
    trusted: false,
    qrVerified: true,
  },
];

export const CONTACTS_STRINGS = {
  title: 'Tus contactos',
  scanQr: 'Escanear QR',
  scanPrompt: 'Coloca el QR de Meshy dentro del encuadre',
  addContact: 'Añadir contacto',
  editContact: 'Editar contacto',
  emptyTitle: 'Haz espacio para los tuyos',
  emptyBody: 'Añade hasta tres personas con su código de Meshy o escanea su QR.',
  trustedHeading: 'De confianza',
  othersHeading: 'Contactos',
  contactName: 'Nombre',
  contactCode: 'Código de usuario',
  contactError:
    'Revisa el nombre y el código. No puedes añadirte a ti mismo, repetir un código ni superar tres contactos.',
  contactRemove: 'Eliminar contacto',
  contactPriority: 'Prioridad',
  removeTrust: 'Quitar de confianza',
  trustedLimitError: 'Ya tienes 3 contactos de confianza. Retira uno para elegir otro.',
  limitFiftyError: 'Puedes guardar hasta 50 contactos.',
} as const;
