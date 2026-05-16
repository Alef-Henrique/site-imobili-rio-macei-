import React from 'react';
import { motion } from 'motion/react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  IconButton, 
  Button, 
  Grid, 
  Skeleton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  Pagination,
  Stack
} from '@mui/material';
import { 
  Bed, 
  SquareFoot, 
  LocationOn, 
  Explore, 
  ArrowForward, 
  FavoriteBorder,
  Star,
  NavigateNext
} from '@mui/icons-material';
import { Property } from '../data/properties';
import { premiumMenuProps } from '../constants';
import { cn } from '@/src/lib/utils';

interface PropertyResultsProps {
  properties: Property[];
  loading?: boolean;
}

export function PropertyResults({ properties, loading }: PropertyResultsProps) {
  if (loading) {
    return (
      <Box className="space-y-8">
        <Box className="flex items-center gap-4">
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="rounded" width={80} height={30} />
        </Box>
        <Grid container spacing={4}>
          {[1, 2, 3].map((i) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i}>
              <Card sx={{ borderRadius: '2rem', border: '1px solid #f1f5f9' }}>
                <Skeleton variant="rectangular" height={260} />
                <CardContent className="p-6">
                  <Skeleton variant="text" width="60%" className="mb-2" />
                  <Skeleton variant="text" width="90%" height={30} className="mb-4" />
                  <Box className="flex gap-4 mb-4">
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="circular" width={40} height={40} />
                  </Box>
                  <Box className="flex justify-between items-center">
                    <Skeleton variant="text" width="40%" height={40} />
                    <Skeleton variant="circular" width={48} height={48} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (properties.length === 0) {
    return (
      <Box className="flex flex-col items-center justify-center py-20 text-center">
        <Box className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 text-slate-300">
          <LocationOn sx={{ fontSize: 48 }} />
        </Box>
        <Typography variant="h4" className="font-black text-slate-800 mb-2 tracking-tight">Nenhum imóvel encontrado</Typography>
        <Typography variant="body1" className="text-slate-500 max-w-sm">Tente ajustar seus filtros para encontrar o que procura na região de Maceió.</Typography>
      </Box>
    );
  }

  return (
    <Box className="space-y-8" id="property-results">
      <Box className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <Box className="flex items-center gap-3">
          <Typography 
            variant="h3" 
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 300,
              letterSpacing: "-0.03em",
              color: '#0f172a',
            }}
          >
            RESULTADOS
          </Typography>
          <Chip 
            label={`${properties.length} ${properties.length === 1 ? 'imóvel' : 'imóveis'}`} 
            size="small"
            className="bg-sky-50 text-sky-600 font-black border-sky-100"
            variant="outlined"
          />
        </Box>
        
        <Box className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
            <Typography 
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#64748b",
                fontWeight: 600,
                ml: 2
              }}
            >
              Ordenação Inteligente
            </Typography>
            <Select
              variant="standard"
              defaultValue="proximity"
              disableUnderline
              MenuProps={premiumMenuProps}
              className="text-[10px] font-black text-slate-700"
              sx={{ 
                minWidth: 130,
                '& .MuiSelect-select': {
                  py: 0.5,
                  px: 1.5,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  color: '#0369a1',
                }
              }}
            >
              <MenuItem value="proximity" sx={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem' }}>Proximidade Inteligente</MenuItem>
              <MenuItem value="price_asc" sx={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem' }}>Oportunidades (Menor Preço)</MenuItem>
              <MenuItem value="price_desc" sx={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem' }}>Exclusividade (Maior Preço)</MenuItem>
            </Select>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {properties.map((p, index) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={p.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="group relative overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_rgba(14,165,233,0.12)] border-sky-50 bg-white"
                sx={{ borderRadius: '2rem', border: '1px solid rgba(14,165,233,0.1)' }}
              >
                {/* Image Container */}
                <Box className="relative h-60 overflow-hidden">
                  <motion.img 
                    src={p.image} 
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <Box className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  <Box className="absolute top-4 left-4 flex gap-2">
                    <Chip 
                      label={p.type} 
                      size="small" 
                      className="bg-sky-500/80 backdrop-blur-md text-[9px] uppercase tracking-widest border border-white/20 px-2" 
                      sx={{ 
                        color: "#ffffff", 
                        fontWeight: 500, 
                        height: 20,
                        "& .MuiChip-label": { color: "#ffffff", px: 1 },
                      }}
                    />
                    {p.isFeatured && (
                      <Chip 
                        label="VIP PRIME" 
                        size="small" 
                        sx={{
                          background: "linear-gradient(135deg, #0284c7, #0369a1)",
                          color: "#ffffff",
                          fontWeight: 800,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          borderRadius: "999px",
                          px: 1,
                          height: 20,
                          fontSize: '8px',
                          boxShadow: "0 4px 15px rgba(2,132,199,0.3)",
                          "& .MuiChip-label": {
                            color: "#ffffff",
                            paddingInline: "4px",
                          },
                          "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow: "0 6px 20px rgba(2,132,199,0.4)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      />
                    )}
                  </Box>
 
                  <IconButton 
                    size="small"
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-slate-400 hover:bg-rose-500 hover:text-white transition-all shadow-lg active:scale-90 border border-white/20"
                    sx={{ width: 32, height: 32 }}
                  >
                    <FavoriteBorder sx={{ fontSize: 16 }} />
                  </IconButton>
 
                  <Box className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <Box>
                      <Box className="flex items-center gap-1 text-white mb-0.5">
                        <LocationOn sx={{ fontSize: 12 }} />
                        <Typography variant="caption" className="text-[9px] font-black uppercase tracking-widest text-white">{p.location}</Typography>
                      </Box>
                      <Typography variant="h6" className="text-white font-black tracking-tight leading-none font-display uppercase drop-shadow-sm text-lg">{p.name}</Typography>
                    </Box>
                    {(p as any).distance !== undefined && (
                      <Chip 
                        icon={<Explore sx={{ fontSize: '12px !important', color: '#0ea5e9 !important' }} />}
                        label={`${(p as any).distance.toFixed(1)} km`}
                        className="bg-white/90 backdrop-blur-md text-sky-600 font-black italic text-[9px] border border-sky-100 pr-1 shadow-sm"
                        size="small"
                        sx={{ height: 20 }}
                      />
                    )}
                  </Box>
                </Box>
 
                {/* Content */}
                <CardContent className="p-5 bg-white">
                  <Box className="flex items-center gap-6 mb-6">
                    <Box className="flex items-center gap-2">
                      <Box className="w-8 h-8 bg-sky-50 rounded-xl flex items-center justify-center text-sky-500 transition-colors group-hover:bg-sky-500 group-hover:text-white">
                        <Bed sx={{ fontSize: 16 }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" className="block text-[7px] font-black text-slate-500 uppercase tracking-widest">Quartos</Typography>
                        <Typography variant="body2" className="font-black text-slate-900 text-xs">{p.bedrooms}</Typography>
                      </Box>
                    </Box>
                    <Box className="flex items-center gap-2">
                      <Box className="w-8 h-8 bg-sky-50 rounded-xl flex items-center justify-center text-sky-500 transition-colors group-hover:bg-sky-500 group-hover:text-white">
                        <SquareFoot sx={{ fontSize: 16 }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" className="block text-[7px] font-black text-slate-500 uppercase tracking-widest">Área Útil</Typography>
                        <Typography variant="body2" className="font-black text-slate-900 font-mono text-xs">{p.area} m²</Typography>
                      </Box>
                    </Box>
                  </Box>
 
                  <Box className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <Box>
                      <Typography variant="caption" className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-0.5">Investimento</Typography>
                      <Typography variant="h6" className="text-xl font-black text-sky-600 tracking-tight">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(p.price)}
                      </Typography>
                    </Box>
                    
                    <Tooltip title="Ver Detalhes Premium" arrow placement="top">
                      <IconButton 
                        className="w-11 h-11 bg-sky-500 hover:bg-sky-600 text-white transition-all duration-500 shadow-xl shadow-sky-200 group/btn active:scale-95"
                        sx={{ borderRadius: '1rem' }}
                      >
                        <NavigateNext sx={{ fontSize: 20 }} className="transition-transform group-hover/btn:translate-x-1" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      
      {/* Pagination component for premium feel */}
      <Stack className="items-center py-12">
        <Pagination 
          count={3} 
          shape="rounded" 
          size="large"
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: '1rem',
              fontWeight: 800,
              fontSize: '0.875rem',
              '&.Mui-selected': {
                backgroundColor: '#0ea5e9',
                color: '#fff',
                '&:hover': { backgroundColor: '#0284c7' }
              }
            }
          }}
        />
      </Stack>
    </Box>
  );
}
