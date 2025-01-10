import { defaultTheme } from "#styles/themes/default";

type StatusBadge = {
    color: Extract<keyof typeof defaultTheme.colors.alert, 'positive100' | 'negative100' | 'warning100' | 'info100'>;
};

type StatusTemplate = 'Aprovado' | 'Reprovado' | 'Em análise';

export type TemplateOption = {
    id: string;
    label: string;
    value: string;
    status: StatusTemplate;
    statusColor: StatusBadge['color'];
};

const TEMPLATES_MOCK_LIST: TemplateOption[] = [
    {
        id: "1",
        label: "Template 1",
        value: "Template-campanha-feira-play-24-05-2023",
        status: "Aprovado",
        statusColor: "positive100",
    },
    {
        id: "2",
        label: "Template 2",
        value: "Template-campanha-lorem",
        status: "Reprovado",
        statusColor: "negative100",
    },
    {
        id: "3",
        label: "Template 3",
        value: "Template-legal-lorem-ipsum-2025",
        status: "Em análise",
        statusColor: "warning100",
    },
    {
        id: "4",
        label: "Template 4",
        value: "template-4",
        status: "Em análise",
        statusColor: "warning100",
    },
    {
        id: "5",
        label: "Template 5",
        value: "template-5",
        status: "Reprovado",
        statusColor: "negative100",
    },
    {
        id: "6",
        label: "Template 6",
        value: "template-6",
        status: "Aprovado",
        statusColor: "positive100",
    },
];

type HealthStatus = {
    label: string;
    color: StatusBadge['color'];
};

type PhoneEntry = {
    name: string;
    number: string;
    health: HealthStatus;
};

export type PhoneCategory = {
    category: string;
    phones: PhoneEntry[];
};

const PHONE_NUMBERS_MOCK_LIST: PhoneCategory[] = [
    {
        category: "Número do evento",
        phones: [
            {
                name: "Evento Principal",
                number: "+55 31 91234-5678",
                health: {
                    label: "saúde Nº: 80%",
                    color: "info100",
                },
            },
        ],
    },
    {
        category: "Número backups",
        phones: [
            {
                name: "Backup 1",
                number: "+55 11 98765-4321",
                health: {
                    label: "saúde Nº: 65%",
                    color: "positive100",
                },
            },
            {
                name: "Backup 2",
                number: "+55 21 99876-5432",
                health: {
                    label: "saúde Nº: 40%",
                    color: "warning100",
                },
            },
            {
                name: "Backup 3",
                number: "+55 31 91234-5678",
                health: {
                    label: "saúde Nº: 75%",
                    color: "info100",
                },
            },
            {
                name: "Backup 4",
                number: "+55 11 98765-4321",
                health: {
                    label: "saúde Nº: 30%",
                    color: "negative100",
                },
            },
            {
                name: "Backup 5",
                number: "+55 71 99765-0000",
                health: {
                    label: "saúde Nº: 100%",
                    color: "positive100",
                },
            },
        ],
    },
];

export {
    TEMPLATES_MOCK_LIST,
    PHONE_NUMBERS_MOCK_LIST,
};
