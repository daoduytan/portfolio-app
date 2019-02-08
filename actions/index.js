import axios from 'axios';
import Cookies from 'js-cookie';
import { getCookieFromReq } from '../helpers/utils';

const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}/api/v1`,
  timeout: 3000
});

const setAuthHeader = req => {
  const token = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON('jwt');

  if (token) {
    return {
      headers: { authorization: `Bearer ${token}` }
    };
  }
  return undefined;
};

const rejectPromise = resError => {
  let error = {};

  if (resError && resError.response && resError.response.data) {
    error = resError.response.data;
  } else {
    error = resError;
  }

  return Promise.reject(error);
};

// --------------- Experience ACTIONS ---------------

export const getAllExperiences = async () => {
  return await axiosInstance
    .get('/experiences')
    .then(response => response.data);
};

export const getExperienceById = async id => {
  return await axiosInstance
    .get(`/experiences/${id}`)
    .then(response => response.data);
};

export const createExperience = async experienceData => {
  return await axiosInstance
    .post('/experiences', experienceData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const updateExperience = async experienceData => {
  return await axiosInstance
    .patch(
      `/experiences/${experienceData._id}`,
      experienceData,
      setAuthHeader()
    )
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const deleteExperience = experienceId => {
  return axiosInstance
    .delete(`/experiences/${experienceId}`, setAuthHeader())
    .then(response => response.data);
};

// --------------- PORTFOLIO ACTIONS ---------------
export const getAllPortfolios = async () => {
  return await axiosInstance.get('/portfolios').then(response => response.data);
};

export const getPortfolioById = async id => {
  return await axiosInstance
    .get(`/portfolios/${id}`)
    .then(response => response.data);
};

export const createPortfolio = async portfolioData => {
  return await axiosInstance
    .post('/portfolios', portfolioData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const updatePortfolio = async portfolioData => {
  return await axiosInstance
    .patch(`/portfolios/${portfolioData._id}`, portfolioData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const deletePortfolio = portfolioId => {
  return axiosInstance
    .delete(`/portfolios/${portfolioId}`, setAuthHeader())
    .then(response => response.data);
};

// --------------- BLOG ACTIONS ---------------

export const getPublishedBlogs = async req => {
  return await axiosInstance.get('/blogs').then(response => response.data);
};

export const getBlogBySlug = async slug => {
  return await axiosInstance
    .get(`/blogs/s/${slug}`)
    .then(response => response.data);
};

export const getUserBlogs = async req => {
  return await axiosInstance
    .get('/blogs/me', setAuthHeader(req))
    .then(response => response.data);
};

export const createBlog = (blogData, lockId) => {
  return axiosInstance
    .post(`/blogs?lockId=${lockId}`, blogData, setAuthHeader())
    .then(response => response.data)
    .catch(err => rejectPromise(err));
};

export const getBlogById = blogId => {
  return axiosInstance.get(`/blogs/${blogId}`).then(response => response.data);
};

export const updateBlog = (blogData, blogId) => {
  return axiosInstance
    .patch(`/blogs/${blogId}`, blogData, setAuthHeader())
    .then(response => response.data)
    .catch(err => rejectPromise(err));
};

export const deleteBlog = blogId => {
  return axiosInstance
    .delete(`/blogs/${blogId}`, setAuthHeader())
    .then(response => response.data)
    .catch(err => rejectPromise(err));
};
