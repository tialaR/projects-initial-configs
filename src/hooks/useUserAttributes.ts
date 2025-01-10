import { useEffect, useState } from 'react';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { useToastInfo } from './useToastInfo';

type UserAttributes = {
    name?: string;
    fullName?: string;
    email?: string;
};

export function useUserAttributes() {
    const [userAttributes, setUserAttributes] = useState<UserAttributes>({} as UserAttributes);
    const { showToast } = useToastInfo();

    useEffect(() => {
        const loadUserAttributes = async () => {
            try {
                await getCurrentUser();
                const attributes = await fetchUserAttributes();

                const formattedAttributes: UserAttributes = {
                    name: attributes.name,
                    fullName: `${attributes.given_name} ${attributes.family_name}`,
                    email: attributes.email,
                };

                setUserAttributes(formattedAttributes);
            } catch (error) {
                showToast({
                    type: "error",
                    message: "Não foi possível carregar dados do usuário!",
                    description: "Tente novamente.",
                });
                console.error('Erro ao carregar atributos do usuário:', error);
            }
        };

        loadUserAttributes();
    }, []);

    return {
        name: userAttributes.name,
        fullName: userAttributes.fullName,
        email: userAttributes.email,
    };
}

