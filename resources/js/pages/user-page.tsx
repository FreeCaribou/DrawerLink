import AppInternLayout from "@/layouts/app-intern-layout";
import { User } from "@/types";
import { useTranslation } from "react-i18next";
import { Form, Head } from "@inertiajs/react";
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

    const [userEdit, setUserEdit] = useState({
        ...user,
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserEdit(prev => ({ ...prev, [name]: value }));
    };

    const handleSuccess = (response: any) => {
        setUserEdit({
            ...response.props.user,
            current_password: "",
            password: "",
            password_confirmation: "",
        });
        setShowSuccess(true);
    };

    const handleError = (err: any) => {
        toastError(err);
    }

    return (
        <AppInternLayout>
            <Head title='User'></Head>
            <h2>{t('hello', { 'name': user.name })}</h2>

            {showSuccess && (
                <div className="mb-6 p-3 bg-green-100 text-green-800 rounded">
                    {t('userInfoChangedGood')}
                </div>
            )}

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
                                <Field>
                                    <FieldLabel htmlFor="user-form-current-password">
                                        {t('form.currentPassword')}
                                    </FieldLabel>
                                    <Input
                                        id="user-form-current-password"
                                        name='current_password'
                                        type="password"
                                        value={userEdit.current_password}
                                        onChange={handleChange}
                                        placeholder={t('form.currentPasswordPlaceholder')}
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="user-form-password">
                                        {t('form.newPassword')}
                                    </FieldLabel>
                                    <Input
                                        id="user-form-password"
                                        name='password'
                                        type="password"
                                        value={userEdit.password}
                                        onChange={handleChange}
                                        placeholder={t('form.newPasswordPlaceholder')}
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="user-form-password-confirmation">
                                        {t('form.confirmPassword')}
                                    </FieldLabel>
                                    <Input
                                        id="user-form-password-confirmation"
                                        name='password_confirmation'
                                        type="password"
                                        value={userEdit.password_confirmation}
                                        onChange={handleChange}
                                        placeholder={t('form.confirmPasswordPlaceholder')}
                                    />
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
