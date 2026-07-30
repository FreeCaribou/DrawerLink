import AppInternLayout from "@/layouts/app-intern-layout";
import { User } from "@/types";
import { useTranslation } from "react-i18next";
import { Form } from "@inertiajs/react";
import { toastError } from "@/lib/utils";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function UserPage({
    user,
}: {
    user: User;
}) {
    const { t } = useTranslation();

    const [userEdit, setUserEdit] = useState({ ...user });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserEdit(prev => ({ ...prev, [name]: value }));
    };

    const handleSuccess = (response: any) => {
        setUserEdit(response.props.user);
    };

    const handleError = (err: any) => {
        toastError(err);
    }

    return (
        <AppInternLayout>
            <h2>{t('hello', { 'name': user.name })}</h2>

            <div className="mt-8">
                <Form
                    action={"/myself"}
                    method='put'
                    onSuccess={handleSuccess}
                    onError={handleError}
                    className="flex flex-col gap-2">
                    <FieldGroup>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="user-form-name">
                                        {t('form.username')}
                                    </FieldLabel>
                                    <Input id="user-form-name" name='name'
                                        value={userEdit.name} onChange={handleChange} required />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="user-form-email">
                                        {t('form.useremail')}
                                    </FieldLabel>
                                    <Input id="user-form-email" name='email' type="mail"
                                        value={userEdit.email} onChange={handleChange} required />
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                    <Button
                        type="submit"
                        className="cursor-pointer mt-5"
                    >
                        {t('save')}
                    </Button>
                </Form>
            </div>
        </AppInternLayout>
    )
}