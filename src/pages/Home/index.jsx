import { colors } from "../../shared/themes"
import { Header } from "../../components/Header"
import { Box, Button, Dialog, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { api } from "../../api/index.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { TableGrid } from "../../components/TableGrid/index.jsx";
import { button, buttonMobile, input, inputError } from "./style.jsx";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório'),
    nomeDoAutor: Yup.string().required('O nome do autor é obrigatório'),
    lancamento: Yup.string().required('A data de lançamento é obrigatória'),
    tipo: Yup.string().required('O tipo é obrigatório'),
    genero: Yup.string().required('O gênero é obrigatório'),
    editora: Yup.string().required('A editora é obrigatória'),
    anoEdicao: Yup.string().required('O ano de edição é obrigatório'),
    numEdicao: Yup.string().required('O número de edição é obrigatório'),
});

export const Home = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [column, setColumn] = useState("")
    const [search, setSearch] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [rows, setRows] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [winSize] = useState(600)
    const [isEdit, setIsEdit] = useState(false)
    const [livroId, setLivroId] = useState("")
    const [rowsFiltered, setRowsFiltered] = useState([])
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth))
    const [attReq, setAttReq] = useState(0)
    const [livro, setLivro] = useState()

    const navigate = useNavigate()


    const handleAtt = () => {
        setAttReq(attReq + 1)
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenModalEdit = () => {
        setIsEdit(true)
        setOpenModalEdit(true)
    }

    const handleCloseModalEdit = () => {
        setIsEdit(false)
        setLivroId("")
        reset()
        setOpenModalEdit(false)
        setLivro()
    }

    const [optionsSearch] = useState([
        {
            column: 'nome',
            label: 'Livro',
        },
        {
            column: 'nomeDoAutor',
            label: 'Autor',
        },
        {
            column: 'lancamento',
            label: 'Lançamento',
        },
        {
            column: 'tipo',
            label: 'Tipo',
        },
        {
            column: 'genero',
            label: 'Genero',
        },
        {
            column: 'editora',
            label: 'Editora',
        },
        {
            column: 'anoEdicao',
            label: 'Ano Edição',
        },
        {
            column: 'numEdicao',
            label: 'Edição Nº',
        },
    ])

    const columns = [
        {
            field: 'nome',
            headerName: 'Livro',
        },
        {
            field: 'nomeDoAutor',
            headerName: 'Autor',
        },
        {
            field: 'lancamento',
            headerName: 'Lançamento',
        },
        {
            field: 'tipo',
            headerName: 'Tipo',
        },
        {
            field: 'genero',
            headerName: 'Genero',
        },
        {
            field: 'editora',
            headerName: 'Editora',
        },
        {
            field: 'anoEdicao',
            headerName: 'Ano Edição',
        },
        {
            field: 'numEdicao',
            headerName: 'Edição Nº',
        },
    ];

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        if (isEdit) {
            api.patch(`/api/livros/${livroId}`, data)
                .then((res) => {
                    toast.success(res.data.message)
                    handleCloseModalEdit()
                    handleAtt()
                    reset()
                })
                .catch((err) => toast.error(err.response.data.errors[0].msg))
        } else {
            api.post("/api/livros", data)
                .then((res) => {
                    toast.success(res.data.message)
                    handleCloseModal()
                    handleAtt()
                    reset()
                })
                .catch((err) => toast.error(err.response.data.errors[0].msg))
        }

    }


    const handleSearch = () => {
        const filter = rows.filter((item) => String(item[column]).toLowerCase().includes(String(search).toLowerCase()))

        if (filter.length === 0) {
            toast.error(`Nenhum resultado encontrado para a pesquisa pelo(a) ${column} ${search}`)
        }
        setRowsFiltered(filter)
    }

    const handleClear = () => {
        setColumn("")
        setSearch("")
        setRowsFiltered([])
    }

    useEffect(() => {
        if (!localStorage.getItem("@token")) {
            navigate("/")
            toast.error("Você não tem permissão para ver esta tela.")
        }

        api.get("/api/livros").then((res) => {
            setRows(res.data)
            setIsLoading(false)
        })
    }, [, attReq])

    return (
        <Box sx={{ backgroundColor: colors.primary_light, width: "100vw", height: "100vh" }}>
            <Header />
            <Box sx={{ margin: "40px 50px" }}>
                <Box sx={windowWidth > 600 ? { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mt: 2 } : { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mt: 2, flexDirection: "column" }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: colors.primary_base, fontSize: '24px', marginLeft: '5px' }}>
                        Livros
                    </Typography>
                    <Box sx={windowWidth > 600 ? { gap: "10px", display: "flex" } : { gap: "10px", display: "flex", flexDirection: "column" }}>
                        <>
                            <FormControl sx={windowWidth > 600 ? { width: '130px' } : { width: '100%', marginTop: "10px" }} size="small">
                                <InputLabel id="column">Coluna</InputLabel>
                                <Select
                                    labelId="column"
                                    id="column"
                                    label="Coluna"
                                    value={column}
                                    onChange={(e) => setColumn(e.target.value)}
                                >
                                    {optionsSearch.map(({ label, column }) => (
                                        <MenuItem key={column} value={column} sx={{ padding: '2px 7px' }}>
                                            {label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                color="secondary"
                                variant="outlined"
                                label="Pesquisar"
                                placeholder="Pesquisar"
                                size="small"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton aria-label="search" onClick={() => handleSearch()}>
                                                <SearchIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={() => handleClear()}>
                                                <CloseIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </>
                        <Button variant="contained" onClick={handleOpenModal} sx={{ backgroundColor: colors.primary_dark, color: colors.primary_light, fontWeight: 600, '&:hover': { backgroundColor: colors.primary_dark, } }}>NOVO LIVRO</Button>
                    </Box>
                </Box>
                <TableGrid
                    rows={rowsFiltered.length > 0 ? rowsFiltered : rows}
                    columns={columns}
                    handleOpenModalEdit={handleOpenModalEdit}
                    onEdit={() => { }}
                    onDelete={handleAtt}
                    setLivroId={setLivroId}
                    handleAttReq={handleAtt}
                    isLoading={isLoading}
                    setLivro={setLivro}
                />
                <Dialog open={openModal} onClose={handleCloseModal} maxWidth={"lg"}>
                    <Box sx={{ width: '500px', padding: "20px" }} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ marginBottom: "40px" }}>
                            <Typography variant="h5" sx={{ fontWeight: 600, color: colors.primary_base, fontSize: '24px', }}>
                                Cadastrar Livro
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                            <TextField
                                label={errors.nome?.message ?? "Nome"}
                                {...register("nome")}
                                error={!!errors.nome?.message}
                                variant="filled"
                                {...register}
                                sx={errors.nome?.message ? inputError : input}
                            />
                            <TextField
                                label={errors.nomeDoAutor?.message ?? "Nome do autor"}
                                {...register("nomeDoAutor")}
                                error={!!errors.nomeDoAutor?.message}
                                variant="filled"
                                {...register}
                                sx={errors.nomeDoAutor?.message ? inputError : input}
                            />
                            <TextField
                                label={errors.lancamento?.message ?? "Lançamento"}
                                {...register("lancamento")}
                                error={!!errors.lancamento?.message}
                                variant="filled"
                                {...register}
                                sx={errors.lancamento?.message ? inputError : input}
                            />
                            <TextField
                                label={errors.tipo?.message ?? "Tipo"}
                                {...register("tipo")}
                                error={!!errors.tipo?.message}
                                variant="filled"
                                {...register}
                                sx={errors.tipo?.message ? inputError : input}
                            />
                            <TextField
                                label={errors.genero?.message ?? "Genero"}
                                {...register("genero")}
                                error={!!errors.genero?.message}
                                variant="filled"
                                {...register}
                                sx={errors.genero?.message ? inputError : input}
                            />
                            <TextField
                                label={errors.editora?.message ?? "Editora"}
                                {...register("editora")}
                                error={!!errors.editora?.message}
                                variant="filled"
                                {...register}
                                sx={errors.editora?.message ? inputError : input}
                            />
                            <TextField
                                label={errors.anoEdicao?.message ?? "Ano da Edição"}
                                {...register("anoEdicao")}
                                error={!!errors.anoEdicao?.message}
                                variant="filled"
                                {...register}
                                sx={errors.anoEdicao?.message ? inputError : input}
                            />
                            <TextField
                                label={errors.numEdicao?.message ?? "Nº da edição"}
                                {...register("numEdicao")}
                                error={!!errors.numEdicao?.message}
                                variant="filled"
                                {...register}
                                sx={errors.numEdicao?.message ? inputError : input}
                            />
                        </Box>
                        <Box sx={{ marginTop: "40px", display: "flex", justifyContent: "end", gap: "20px" }}>
                            <Button variant='contained' onClick={handleCloseModal} sx={{ backgroundColor: colors.primary_light, color: colors.primary_base, fontWeight: 700, "&:hover": { backgroundColor: colors.neutral_base } }}>Cancelar</Button>
                            <Button variant='contained' type='submit' sx={windowWidth < winSize ? buttonMobile : button} >{isEdit ? "Editar" : "Cadastrar"}</Button>
                        </Box>
                    </Box>
                </Dialog>
                <Dialog open={openModalEdit} onClose={handleCloseModalEdit} maxWidth={"lg"}>
                    <Box sx={windowWidth < winSize ? { width: '80vw', padding: "20px" } : { width: '500px', padding: "20px" }} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ marginBottom: "40px" }}>
                            <Typography variant="h5" sx={{ fontWeight: 600, color: colors.primary_base, fontSize: '24px', }}>
                                Editar livro
                            </Typography>
                        </Box>
                        {livro && <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                            <TextField
                                label={errors.nome?.message ?? "Nome"}
                                {...register("nome")}
                                error={!!errors.nome?.message}
                                defaultValue={livro?.nome}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="filled"
                                {...register}
                                sx={errors.nome?.message ? inputError : input}
                            />
                            <TextField
                                label={errors.nomeDoAutor?.message ?? "Nome do autor"}
                                {...register("nomeDoAutor")}
                                defaultValue={livro?.nomeDoAutor}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                error={!!errors.nomeDoAutor?.message}
                                variant="filled"
                                {...register}
                                sx={errors.nomeDoAutor?.message ? inputError : input}
                            />
                            <TextField
                                label={errors.lancamento?.message ?? "Lançamento"}
                                {...register("lancamento")}
                                defaultValue={livro?.lancamento}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                error={!!errors.lancamento?.message}
                                variant="filled"
                                {...register}
                                sx={errors.lancamento?.message ? inputError : input}
                            />
                            <TextField
                                label={errors.tipo?.message ?? "Tipo"}
                                {...register("tipo")}
                                defaultValue={livro?.tipo}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                error={!!errors.tipo?.message}
                                variant="filled"
                                {...register}
                                sx={errors.tipo?.message ? inputError : input}
                            />
                            <TextField
                                label={errors.genero?.message ?? "Genero"}
                                {...register("genero")}
                                defaultValue={livro?.genero}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                error={!!errors.genero?.message}
                                variant="filled"
                                {...register}
                                sx={errors.genero?.message ? inputError : input}
                            />
                            <TextField
                                label={errors.editora?.message ?? "Editora"}
                                {...register("editora")}
                                defaultValue={livro?.editora}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                error={!!errors.editora?.message}
                                variant="filled"
                                {...register}
                                sx={errors.editora?.message ? inputError : input}
                            />
                            <TextField
                                label={errors.anoEdicao?.message ?? "Ano da Edição"}
                                {...register("anoEdicao")}
                                defaultValue={livro?.anoEdicao}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                error={!!errors.anoEdicao?.message}
                                variant="filled"
                                {...register}
                                sx={errors.anoEdicao?.message ? inputError : input}
                            />
                            <TextField
                                label={errors.numEdicao?.message ?? "Nº da edição"}
                                {...register("numEdicao")}
                                defaultValue={livro?.numEdicao}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                error={!!errors.numEdicao?.message}
                                variant="filled"
                                {...register}
                                sx={errors.numEdicao?.message ? inputError : input}
                            />
                        </Box>}

                        <Box sx={windowWidth < winSize ? { marginTop: "40px", display: "flex", gap: "20px", flexDirection: "column", width: "100%" } : { marginTop: "40px", display: "flex", justifyContent: "end", gap: "20px" }}>
                            <Button variant='contained' onClick={handleCloseModalEdit} sx={{ backgroundColor: colors.primary_light, color: colors.primary_base, fontWeight: 700, "&:hover": { backgroundColor: colors.neutral_base } }}>Cancelar</Button>
                            <Button variant='contained' type='submit' sx={windowWidth < winSize ? buttonMobile : button} >{"Editar"}</Button>
                        </Box>
                    </Box>
                </Dialog>
            </Box>

        </Box>
    )
}