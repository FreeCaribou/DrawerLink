import { Draw, Tag } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SavedLinkList from './saved-link-list';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { FileSearch, TagIcon, WarehouseIcon, GlobeIcon, CalendarIcon, XIcon } from 'lucide-react';
import { Input } from './ui/input';
import { Field, FieldLabel } from './ui/field';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './ui/input-group';
import { DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';

export default function BigSearch({
}: {
    }) {
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState('');
    const [selectedDraws, setSelectedDraws] = useState<number[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [selectedSources, setSelectedSources] = useState<string[]>([]);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [openDatePicker, setOpenDatePicker] = useState(false);

    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isElementLoading, setIsElementLoading] = useState(false);

    const [drawList, setDrawList] = useState<Draw[]>([]);
    const [tagList, setTagList] = useState<Tag[]>([]);
    const [sourceList, setSourceList] = useState<string[]>([]);

    function formatDate(date: Date | undefined) {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsElementLoading(true);
            try {
                const response = await axios.get('/data/search-filter-element/');
                setTagList(response.data.tags);
                setDrawList(response.data.draws);
                setSourceList(response.data.sources);
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

    const handleSourceClick = (source: string) => {
        setSelectedSources(selectedSources.includes(source) ? selectedSources.filter((s) => s !== source) : [...selectedSources, source]);
    }

    const clearDateRange = () => {
        setDateRange(undefined);
    }

    const search = async (form: React.FormEvent<HTMLFormElement>) => {
        form.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.get('/data/saved-links/', {
                params: {
                    text: searchText,
                    draws: selectedDraws,
                    tags: selectedTags,
                    sources: selectedSources,
                    start_date: dateRange?.from ? formatDate(dateRange.from) : '',
                    end_date: dateRange?.to ? formatDate(dateRange.to) : ''
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
            <h4>{t('whatDoYouSearch')}</h4>
            <form onSubmit={search} className='mb-2 flex flex-col gap-3'>
                <Field>
                    <FieldLabel htmlFor="draw-form-label">
                        {t('form.text')}
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
                <div>
                    {sourceList?.length > 0 &&
                        <div className="flex w-full flex-wrap gap-2">
                            <GlobeIcon size={18} className='text-secondary'></GlobeIcon>
                            {sourceList.map((source) => (
                                <React.Fragment key={source}>
                                    <Badge
                                        variant={selectedSources.includes(source) ? 'secondary' : 'outline'}
                                        className="cursor-pointer"
                                        onClick={() => handleSourceClick(source)}
                                    >
                                        {source}
                                    </Badge>
                                </React.Fragment>
                            ))}
                        </div>
                    }
                </div>
                <Field>
                    <FieldLabel>
                        <CalendarIcon size={16} className='text-secondary inline mr-1' />
                        {t('form.dateRange')}
                    </FieldLabel>
                    <div className="flex gap-2">
                        <InputGroup className="flex-1">
                            <InputGroupInput
                                placeholder={dateRange?.from ? `${formatDate(dateRange.from)} to ${dateRange.to ? formatDate(dateRange.to) : '?'}` : t('form.selectDateRange')}
                                readOnly
                                onClick={() => setOpenDatePicker(true)}
                            />
                            <InputGroupAddon align="inline-end">
                                <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
                                    <PopoverTrigger asChild>
                                        <InputGroupButton
                                            variant="ghost"
                                            size="icon-xs"
                                            aria-label="Select date range"
                                        >
                                            <CalendarIcon />
                                            <span className="sr-only">{t('form.selectDateRange')}</span>
                                        </InputGroupButton>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                                        <Calendar
                                            mode="range"
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            numberOfMonths={2}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </InputGroupAddon>
                        </InputGroup>
                        {dateRange && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={clearDateRange}
                                aria-label="Clear date range"
                            >
                                <XIcon className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </Field>
                <Button
                    type="submit"
                    className="cursor-pointer"
                    variant="secondary"
                >
                    <FileSearch></FileSearch> {t('search')}
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
