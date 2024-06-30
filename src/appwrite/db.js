import config from "../config/config";
import { Databases, Client, Storage, ID, Query } from "appwrite";

export class DBService {
  client = new Client();
  database;
  storgae;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);

    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, image, content, status, userId, slug, name }) {
    // console.log("Useranem is ::", userName);
    try {
      return await this.database.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        {
          title,
          image,
          content,
          status,
          userId,
          name,
        }
      );
    } catch (err) {
      throw err;
    }
  }

  async updatePost(slug, { title, image, content, status }) {
    try {
      return await this.database.updateDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        {
          title,
          image,
          content,
          status,
        }
      );
    } catch (err) {
      console.log("appWrite :: updatePost :: error", err);
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
      return true;
    } catch (err) {
      console.log("appWrite :: deletePost :: error", err);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        queries
      );
    } catch (err) {
      console.log("appWrite :: getPosts :: error", err);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (err) {
      console.log("appWrite :: uploadFile :: error", err);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appWriteBucketId, fileId);
      return true;
    } catch (err) {
      console.log("appWrite :: deleteFile :: error", err);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(config.appWriteBucketId, fileId);
    } catch (err) {
      console.log("appWrite :: filePreviewFile :: error", err);
    }
  }
}

const dbService = new DBService();

export default dbService;
