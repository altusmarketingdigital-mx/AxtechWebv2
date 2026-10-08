'use server'

import { requireAdmin } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const DEFAULT_COMPANY_SETTINGS = {
  companyName: 'AXTECH INGENIERÍA',
  address: 'Av. Acueducto 739, San Pedro Zacatenco, Gustavo A. Madero, C.P. 07360, CDMX',
  phones: '(56) 6585 0766 | (55) 1348 5574',
  email: 'ventas@axtech-ingenieria.com',
  website: 'www.axtech-ingenieria.com',
  bankName: 'BANAMEX',
  accountName: 'HECTOR AXANI HERRERA MONRROY',
  accountNumber: '6226879',
  clabe: '002180702062268792',
  defaultIva: 16,
  defaultIsr: 0,
  defaultNotes: 'Garantía fija de 30 días naturales a partir de la entrega del equipo o servicio.',
  termsAndConds: '1. Los precios incluidos en esta cotización tienen una vigencia de 15 días naturales a partir de la fecha de emisión. 2. El servicio se realizará una vez confirmado el pago total o el anticipo acordado. 3. La garantía cubre únicamente defectos relacionados con el servicio prestado, no daños por mal uso o causas externas. 4. AXTECH INGENIERIA no se hace responsable por pérdida de información; se recomienda respaldar datos previamente. 5. Cualquier servicio adicional no contemplado en esta cotización será presupuestado por separado.',
  privacyNotice: 'En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), AxTech Ingeniería, con domicilio en Av. Acueducto 739, San Pedro Zacatenco, Gustavo A. Madero, C.P. 07360, CDMX, es responsable del tratamiento de sus datos personales. Los datos recabados serán utilizados exclusivamente para la elaboración de cotizaciones, facturación y prestación de servicios contratados. No se compartirán con terceros sin su consentimiento, salvo en los casos previstos por la ley. Usted tiene derecho a ejercer sus derechos ARCO (Acceso, Rectificación, Cancelación y Oposición) enviando una solicitud a ventas@axtech-ingenieria.com',
  dataUsagePolicy: 'Sus datos personales serán tratados conforme a los principios de licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad establecidos en la LFPDPPP. Al aceptar esta cotización, usted otorga su consentimiento para el tratamiento de sus datos con las finalidades descritas. Puede revocar su consentimiento en cualquier momento mediante solicitud escrita a nuestro correo electrónico.'
}

export async function getCompanySettings() {
  await requireAdmin()
  
  let settings = await prisma.companySettings.findUnique({
    where: { id: 'default' }
  })
  
  if (!settings) {
    settings = await prisma.companySettings.create({
      data: { 
        id: 'default',
        ...DEFAULT_COMPANY_SETTINGS
      }
    })
  } else {
    // Si algún campo bancario o legal clave no está configurado, rellenarlo con los valores predeterminados
    const needsUpdate = !settings.bankName || !settings.clabe || !settings.accountName || !settings.termsAndConds || !settings.defaultNotes
    if (needsUpdate) {
      settings = await prisma.companySettings.update({
        where: { id: 'default' },
        data: {
          companyName: settings.companyName || DEFAULT_COMPANY_SETTINGS.companyName,
          address: settings.address || DEFAULT_COMPANY_SETTINGS.address,
          phones: settings.phones || DEFAULT_COMPANY_SETTINGS.phones,
          email: settings.email || DEFAULT_COMPANY_SETTINGS.email,
          website: settings.website || DEFAULT_COMPANY_SETTINGS.website,
          bankName: settings.bankName || DEFAULT_COMPANY_SETTINGS.bankName,
          accountName: settings.accountName || DEFAULT_COMPANY_SETTINGS.accountName,
          accountNumber: settings.accountNumber || DEFAULT_COMPANY_SETTINGS.accountNumber,
          clabe: settings.clabe || DEFAULT_COMPANY_SETTINGS.clabe,
          defaultNotes: settings.defaultNotes || DEFAULT_COMPANY_SETTINGS.defaultNotes,
          termsAndConds: settings.termsAndConds || DEFAULT_COMPANY_SETTINGS.termsAndConds,
          privacyNotice: settings.privacyNotice || DEFAULT_COMPANY_SETTINGS.privacyNotice,
          dataUsagePolicy: settings.dataUsagePolicy || DEFAULT_COMPANY_SETTINGS.dataUsagePolicy,
        }
      })
    }
  }
  
  return settings
}

export async function updateCompanySettings(data: any) {
  await requireAdmin()
  
  await prisma.companySettings.upsert({
    where: { id: 'default' },
    update: data,
    create: { id: 'default', ...data }
  })
  
  revalidatePath('/admin/configuracion')
  revalidatePath('/admin/cotizaciones')
  return { success: true }
}
