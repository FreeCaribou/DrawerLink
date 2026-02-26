import { Draw, Tag } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SavedLinkList from './saved-link-list';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { FileSearch, TagIcon, WarehouseIcon } from 'lucide-react';
import { Input } from './ui/input';
import { Field, FieldLabel } from './ui/field';
import { Badge } from './ui/badge';

// TODO, range of data for the search, search with sources also
export default function BigSearch({
}: {
    }) {
    const [searchText, setSearchText] = useState('');
    const [selectedDraws, setSelectedDraws] = useState<number[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isElementLoading, setIsElementLoading] = useState(false);

    const [drawList, setDrawList] = useState<Draw[]>([]);
    const [tagList, setTagList] = useState<Tag[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsElementLoading(true);
            try {
                const response = await axios.get('/data/search-filter-element/');
                console.log('element', response.data)
                setTagList(response.data.tags);
                setDrawList(response.data.draws);
            } catch (error: any) {
                console.error("Error :", error.response.data);
            } finally {
                setIsElementLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleTagClick = (id: number) => {
        setSelectedTags(selectedTags.includes(id) ? selectedTags.filter((i) => i !== id) : [...selectedTags, id]);
    }

    const handleDrawClick = (id: number) => {
        setSelectedDraws(selectedDraws.includes(id) ? selectedDraws.filter((i) => i !== id) : [...selectedDraws, id]);
    }

    const search = async (form: React.FormEvent<HTMLFormElement>) => {
        form.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.get('/data/saved-links/', {
                params: {
                    text: searchText,
                    draws: selectedDraws,
                    tags: selectedTags
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
            <h4>What link do you search ?</h4>
            <form onSubmit={search} className='mb-2 flex flex-col gap-3'>
                <Field>
                    <FieldLabel htmlFor="draw-form-label">
                        Text
                    </FieldLabel>
                    <Input id="draw-form-label" name='label' value={searchText}
                        onChange={(e) => setSearchText(e.target.value)} />
                </Field>
                {isElementLoading && (<Skeleton className="h-8" />)}
                <div>
                    {drawList?.length > 0 &&
                        <div className="flex w-full flex-wrap gap-2">
                            <WarehouseIcon size={18} className='text-secondary'></WarehouseIcon>
                            {drawList.map((draw) => (
                                <React.Fragment key={draw.id}>
                                    <Badge
                                        variant={selectedDraws.includes(draw.id) ? 'secondary' : 'outline'}
                                        className="cursor-pointer"
                                        onClick={() => handleDrawClick(draw.id)}
                                    >{draw.label}</Badge>
                                </React.Fragment>
                            ))}
                        </div>
                    }
                </div>
                <div>
                    {tagList?.length > 0 &&
                        <div className="flex w-full flex-wrap gap-2">
                            <TagIcon size={18} className='text-secondary'></TagIcon>
                            {tagList.map((tag) => (
                                <React.Fragment key={tag.id}>
                                    <Badge
                                        variant={selectedTags.includes(tag.id) ? 'secondary' : 'outline'}
                                        className="cursor-pointer"
                                        onClick={() => handleTagClick(tag.id)}
                                    >
                                        {tag.label}
                                    </Badge>
                                </React.Fragment>
                            ))}
                        </div>
                    }
                </div>
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
