import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Autocomplete, 
  TextField, 
  Select, 
  MenuItem, 
  Slider, 
  Button, 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  InputAdornment,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  Tooltip,
  Paper,
  Chip
} from '@mui/material';
import { 
  Search, 
  LocationOn, 
  Home, 
  KingBed, 
  AttachMoney, 
  FilterList, 
  Close,
  Explore
} from '@mui/icons-material';
import { propertyTypes, mockProperties, Property } from '../data/properties';
import { cn } from '@/src/lib/utils';

// Distance calculation helper (Haversine formula)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const maceioCoords = { lat: -9.6498, lng: -35.7089 };

interface SearchFiltersProps {
  onResults: (results: Property[]) => void;
  loading: boolean;
  onSearchStateChange: (searching: boolean) => void;
}

const staticSuggestions = [
  'Ponta Verde, Maceió',
  'Jatiúca, Maceió',
  'Cruz das Almas, Maceió',
  'Barra de São Miguel, AL',
  'Paripueira, AL',
  'Marechal Deodoro, AL'
];

interface PropertyTypeOption {
  value: string;
  label: string;
  icon?: React.ElementType;
}

export function SearchFilters({ onResults, loading, onSearchStateChange }: SearchFiltersProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [locationValue, setLocationValue] = useState<string | null>(null);
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState<number[]>([100000, 10000000]);
  const [bedrooms, setBedrooms] = useState('any');

  const propertyTypeOptions: PropertyTypeOption[] = [
    { value: 'all', label: 'Todos' },
    ...propertyTypes.map(t => ({ ...t, icon: t.icon as React.ElementType }))
  ];

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `R$ ${(val / 1000000).toFixed(1)}M`;
    return `R$ ${(val / 1000).toFixed(0)}K`;
  };

  const handleSearch = useCallback(async () => {
    onSearchStateChange(true);
    // Simulate API delay for premium feel
    await new Promise(resolve => setTimeout(resolve, 1500));

    let results = [...mockProperties];

    if (propertyType !== 'all') {
      results = results.filter(p => p.type === propertyType);
    }

    results = results.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (bedrooms !== 'any') {
      results = results.filter(p => p.bedrooms >= parseInt(bedrooms));
    }

    // In a real app we'd get coords from Autocomplete
    const pivotCoords = maceioCoords; 
    results = results.map(p => ({
      ...p,
      distance: calculateDistance(pivotCoords.lat, pivotCoords.lng, p.lat, p.lng)
    }));

    results.sort((a: any, b: any) => a.distance - b.distance);

    onResults(results);
    onSearchStateChange(false);
    setIsDrawerOpen(false);

    const resultsEl = document.getElementById('property-results');
    if (resultsEl) {
      window.scrollTo({ top: resultsEl.offsetTop - 100, behavior: 'smooth' });
    }
  }, [propertyType, priceRange, bedrooms, onResults, onSearchStateChange]);

  const FilterContent = () => (
    <Box className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end">
      {/* Location */}
      <Box className="space-y-2">
        <Typography variant="caption" className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 flex items-center gap-2">
          <LocationOn fontSize="small" className="text-sky-500" />
          Localização
        </Typography>
        <Autocomplete
          options={staticSuggestions}
          value={locationValue}
          onChange={(_, newValue) => setLocationValue(newValue)}
          fullWidth
          slotProps={{
            paper: {
              className: 'premium-scrollbar glass-dropdown shadow-2xl',
              sx: {
                mt: 1,
                borderRadius: '1.5rem',
                maxHeight: 320,
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.25)',
                '& .MuiAutocomplete-listbox': {
                  p: 1.5,
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: 'inherit',
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': { width: '4px' },
                  '&::-webkit-scrollbar-track': { background: 'transparent' },
                  '&::-webkit-scrollbar-thumb': { 
                    background: 'linear-gradient(to bottom, rgba(14, 165, 233, 0.4), rgba(14, 165, 233, 0.2))',
                    borderRadius: '20px' 
                  },
                  '& .MuiAutocomplete-option': {
                    px: 2.5, py: 1.5, mx: 0.5, my: 0.5, borderRadius: '1rem', fontSize: '0.875rem', fontWeight: 600,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': { 
                      backgroundColor: 'rgba(14, 165, 233, 0.08)', 
                      color: '#0ea5e9', 
                      transform: 'translateX(6px)' 
                    },
                    '&[aria-selected="true"]': { 
                      backgroundColor: '#0ea5e9', 
                      color: '#fff',
                      boxShadow: '0 8px 20px -4px rgba(14, 165, 233, 0.4)',
                    }
                  }
                }
              }
            },
            popper: {
              placement: 'bottom-start',
              modifiers: [
                {
                  name: 'offset',
                  options: { offset: [0, 8] },
                },
                {
                  name: 'preventOverflow',
                  enabled: true,
                },
              ],
              sx: {
                width: 'anchor', // STRICT WIDTH MATCH
                zIndex: theme.zIndex.modal + 1
              }
            }
          }}
          renderInput={(params) => (
            <TextField 
              {...params} 
              placeholder="Digite bairro, rua ou cidade"
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '1rem',
                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                  '& fieldset': { borderColor: 'rgba(241, 245, 249, 1)' },
                  '&:hover fieldset': { borderColor: '#0ea5e9' },
                  '&.Mui-focused fieldset': { borderColor: '#0ea5e9', borderWidth: '1px' },
                }
              }}
            />
          )}
        />
      </Box>

      {/* Property Type */}
      <Box className="space-y-2">
        <Typography variant="caption" className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 flex items-center gap-2">
          <Home fontSize="small" className="text-orange-500" />
          Tipo de Imóvel
        </Typography>
        <Autocomplete
          options={propertyTypeOptions}
          value={propertyTypeOptions.find(t => t.value === propertyType) || propertyTypeOptions[0]}
          onChange={(_, newValue) => setPropertyType(newValue?.value || 'all')}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          fullWidth
          disableClearable
          slotProps={{
            paper: {
              className: 'premium-scrollbar glass-dropdown shadow-2xl',
              sx: {
                mt: 1,
                borderRadius: '1.5rem',
                maxHeight: 320,
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.25)',
                '& .MuiAutocomplete-listbox': {
                  p: 1.5,
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': { width: '4px' },
                  '&::-webkit-scrollbar-track': { background: 'transparent' },
                  '&::-webkit-scrollbar-thumb': { 
                    background: 'linear-gradient(to bottom, rgba(14, 165, 233, 0.4), rgba(14, 165, 233, 0.2))',
                    borderRadius: '20px' 
                  },
                  '& .MuiAutocomplete-option': {
                    px: 2.5, py: 1.5, mx: 0.5, my: 0.5, borderRadius: '1rem', fontSize: '0.875rem', fontWeight: 600,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': { 
                      backgroundColor: 'rgba(14, 165, 233, 0.08)', 
                      color: '#0ea5e9', 
                      transform: 'translateX(6px)' 
                    },
                    '&[aria-selected="true"]': { 
                      backgroundColor: '#0ea5e9', 
                      color: '#fff',
                      boxShadow: '0 8px 20px -4px rgba(14, 165, 233, 0.4)',
                    }
                  }
                }
              }
            },
            popper: {
              placement: 'bottom-start',
              sx: { width: 'anchor', zIndex: theme.zIndex.modal + 1 }
            }
          }}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props as any;
            const Icon = option.icon;
            return (
              <li key={key} {...optionProps} className={cn(optionProps.className, "flex items-center gap-3")}>
                {Icon && <Icon size={16} className="mr-2" />}
                {option.label}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField 
              {...params}
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '1rem',
                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                  '& fieldset': { borderColor: 'rgba(241, 245, 249, 1)' },
                  '&:hover fieldset': { borderColor: '#0ea5e9' },
                  '&.Mui-focused fieldset': { borderColor: '#0ea5e9', borderWidth: '1px' },
                }
              }}
            />
          )}
        />
      </Box>

      {/* Price Range */}
      <Box className="space-y-2">
        <Box className="flex justify-between items-center px-1">
          <Typography variant="caption" className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 flex items-center gap-2">
            <AttachMoney fontSize="small" className="text-emerald-500" />
            Faixa de Preço
          </Typography>
          <Typography variant="caption" className="text-[10px] font-bold text-sky-600">
            {formatCurrency(priceRange[0])} — {formatCurrency(priceRange[1])}
          </Typography>
        </Box>
        <Box className="h-[56px] flex items-center px-4 bg-slate-50 border border-slate-100 rounded-2xl">
          <Slider
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue as number[])}
            min={100000}
            max={10000000}
            step={100000}
            valueLabelDisplay="auto"
            valueLabelFormat={formatCurrency}
            sx={{
              color: '#0ea5e9',
              height: 4,
              '& .MuiSlider-thumb': {
                width: 20,
                height: 20,
                backgroundColor: '#fff',
                border: '2px solid currentColor',
                '&:hover': { boxShadow: '0 0 0 8px rgba(14, 165, 233, 0.16)' },
              },
              '& .MuiSlider-rail': { opacity: 0.2, backgroundColor: '#bfdbfe' },
            }}
          />
        </Box>
      </Box>

      {/* Bedrooms & Search */}
      <Box className="space-y-2">
        <Typography variant="caption" className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 flex items-center gap-2">
          <KingBed fontSize="small" className="text-indigo-500" />
          Quartos
        </Typography>
        <Box className="flex gap-3">
          <Autocomplete
            options={['any', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
            value={bedrooms}
            onChange={(_, newValue) => setBedrooms(newValue || 'any')}
            getOptionLabel={(option) => option === 'any' ? 'Qualquer' : `${option} ${option === '1' ? 'quarto' : 'quartos'}`}
            fullWidth
            className="flex-1"
            disableClearable
            slotProps={{
              paper: {
                className: 'premium-scrollbar glass-dropdown shadow-2xl',
                sx: {
                  mt: 1,
                  borderRadius: '1.5rem',
                  maxHeight: 320,
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.25)',
                  '& .MuiAutocomplete-listbox': {
                    p: 1.5,
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': { width: '4px' },
                    '&::-webkit-scrollbar-track': { background: 'transparent' },
                    '&::-webkit-scrollbar-thumb': { 
                      background: 'linear-gradient(to bottom, rgba(14, 165, 233, 0.4), rgba(14, 165, 233, 0.2))',
                      borderRadius: '20px' 
                    },
                    '& .MuiAutocomplete-option': {
                      px: 2.5, py: 1.5, mx: 0.5, my: 0.5, borderRadius: '1rem', fontSize: '0.875rem', fontWeight: 600,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': { 
                        backgroundColor: 'rgba(14, 165, 233, 0.08)', 
                        color: '#0ea5e9', 
                        transform: 'translateX(6px)' 
                      },
                      '&[aria-selected="true"]': { 
                        backgroundColor: '#0ea5e9', 
                        color: '#fff',
                        boxShadow: '0 8px 20px -4px rgba(14, 165, 233, 0.4)',
                      }
                    }
                  }
                }
              },
              popper: {
                placement: 'bottom-start',
                sx: { width: 'anchor', zIndex: theme.zIndex.modal + 1 }
              }
            }}
            renderInput={(params) => (
              <TextField 
                {...params}
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '1rem',
                    backgroundColor: 'rgba(248, 250, 252, 0.8)',
                    '& fieldset': { borderColor: 'rgba(241, 245, 249, 1)' },
                    '&:hover fieldset': { borderColor: '#0ea5e9' },
                    '&.Mui-focused fieldset': { borderColor: '#0ea5e9', borderWidth: '1px' },
                  }
                }}
              />
            )}
          />
          
          <Button
            onClick={handleSearch}
            disabled={loading}
            variant="contained"
            className="h-14 min-w-[56px] lg:min-w-[140px] rounded-2xl shadow-xl shadow-sky-600/20 active:scale-95 transition-all"
            sx={{
              background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
              '&:hover': { background: 'linear-gradient(135deg, #0284c7, #0369a1)' },
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 800,
              fontSize: '0.75rem',
            }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : <Search />}
            {!isMobile && <span className="ml-2">Buscar</span>}
          </Button>
        </Box>
      </Box>
    </Box>
  );


  return (
    <Box className="w-full max-w-7xl mx-auto relative z-20 px-4">
      {isMobile ? (
        <Paper 
          elevation={0}
          className="bg-white/80 backdrop-blur-2xl p-4 rounded-3xl shadow-xl border border-white/50 flex items-center justify-between"
        >
          <Box className="flex items-center gap-3">
            <Box className="p-3 bg-sky-50 rounded-xl text-sky-600">
              <Search fontSize="small" />
            </Box>
            <Box>
              <Typography variant="subtitle2" className="font-black text-slate-800">FILTRAR BUSCA</Typography>
              <Typography variant="caption" className="text-slate-400 font-bold">Imóveis em Maceió e região</Typography>
            </Box>
          </Box>
          <IconButton onClick={() => setIsDrawerOpen(true)} className="bg-slate-50">
            <FilterList />
          </IconButton>
        </Paper>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-3xl p-8 rounded-[3rem] shadow-[0_30px_70px_rgba(0,0,0,0.12)] border border-white/60"
        >
          <FilterContent />
        </motion.div>
      )}

      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              borderTopLeftRadius: '2.5rem',
              borderTopRightRadius: '2.5rem',
              p: 4,
              maxHeight: '90vh',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)'
            }
          }
        }}
      >
        <Box className="flex items-center justify-between mb-8">
          <Typography variant="h6" className="font-black text-slate-900 tracking-tight">FILTRAR IMÓVEIS</Typography>
          <IconButton onClick={() => setIsDrawerOpen(false)}><Close /></IconButton>
        </Box>
        <FilterContent />
        <Button 
          fullWidth 
          variant="contained" 
          onClick={handleSearch}
          className="mt-8 h-16 rounded-2xl bg-sky-600 text-lg font-black"
          sx={{ mt: 4 }}
        >
          VER RESULTADOS
        </Button>
      </Drawer>
    </Box>
  );
}
