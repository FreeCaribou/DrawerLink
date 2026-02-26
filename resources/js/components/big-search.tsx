import { Draw } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SavedLinkList from './saved-link-list';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { FileSearch } from 'lucide-react';
import { Input } from './ui/input';
import { Field, FieldLabel } from './ui/field';

// TODO, range of data for the search, search with drawer, tags, sources
export default function BigSearch({
    drawBaseList = [],
}: {
    drawBaseList: Draw[];
}) {
    const [searchText, setSearchText] = useState('');
    const [searchDrawers, setSearchDrawers] = useState<string[]>([]);
    const [searchTags, setSearchTags] = useState<string[]>([]);

    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [drawList, setDrawList] = useState<Draw[]>([]);

    useEffect(() => {
        setDrawList(drawBaseList);
    }, [drawBaseList]);

    const search = async (form: React.FormEvent<HTMLFormElement>) => {
        form.preventDefault();
        console.log('search !', searchText, searchDrawers, searchTags);
        setIsLoading(true);
        try {
            const response = await axios.get('/data/saved-links/', {
                params: {
                    text: searchText,
                    draws: searchDrawers
                }
            });
            setLinks(response.data);
        } catch (error: any) {
            console.error("Error :", error.response.data);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h4>Search...</h4>
            <form onSubmit={search} className='mb-2 flex flex-col gap-2'>
                <Field>
                    <FieldLabel htmlFor="draw-form-label">
                        Text
                    </FieldLabel>
                    <Input id="draw-form-label" name='label' required value={searchText}
                        onChange={(e) => setSearchText(e.target.value)} />
                </Field>
                <Field>
                    <FieldLabel>
                        Drawers (todo)
                    </FieldLabel>
                </Field>
                <Field>
                    <FieldLabel>
                        Tags (todo)
                    </FieldLabel>
                </Field>
                <Field>
                    <FieldLabel>
                        Sources (todo)
                    </FieldLabel>
                </Field>
                <Field>
                    <FieldLabel>
                        Ranges of date source (todo)
                    </FieldLabel>
                </Field>
                <Button
                    type="submit"
                    className="cursor-pointer"
                    variant="secondary"
                >
                    <FileSearch></FileSearch> Search
                </Button>
            </form>
            <div>
                {isLoading && (
                    <div>
                        {Array.from({ length: 3 }, (_, i) => (
                            <Skeleton key={i} className="h-8 mb-2" />
                        ))}
                    </div>
                )}
                <SavedLinkList savedLinks={links} withDrawTitle={true} />
            </div>
        </div>
    );
}
