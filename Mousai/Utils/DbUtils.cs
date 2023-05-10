
using System;
using Microsoft.Data.SqlClient;

namespace Mousai.Utils
{
    /// <summary>
    ///  A set of useful function for interacting with ADO.NET
    /// </summary>
    public static class DbUtils
    {
        /// <summary>
        ///  Get a non-null string from a data reader object.
        /// </summary>
        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
        /// <param name="column">The name of the column from the result set referred to by the reader.</param>
        /// <returns>The value of the given column.</returns>
        public static string GetNonNullString(SqlDataReader reader, string column)
        {
            return reader.GetString(reader.GetOrdinal(column));
        }

        /// <summary>
        ///  Get a nullable string from a data reader object and gracefully handle NULL values.
        /// </summary>
        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
        /// <param name="column">The name of the column from the result set referred to by the reader.</param>
        /// <returns>The value of the given column or null.</returns>
        public static string GetNullableString(SqlDataReader reader, string column)
        {
            int ordinal = reader.GetOrdinal(column);
            return reader.IsDBNull(ordinal) ? null : reader.GetString(ordinal);
        }

        /// <summary>
        ///  Get an integer from a data reader object.
        /// </summary>
        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
        /// <param name="column">The name of the column from the result set referred to by the reader.</param>
        /// <returns>The value of the given column.</returns>
        public static int GetInt(SqlDataReader reader, string column)
        {
            return reader.GetInt32(reader.GetOrdinal(column));
        }

        /// <summary>
        ///  Get a DateTime from a data reader object.
        /// </summary>
        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
        /// <param name="column">The name of the column from the result set referred to by the reader.</param>
        /// <returns>The value of the given column.</returns>
        public static DateTime GetDateTime(SqlDataReader reader, string column)
        {
            return reader.GetDateTime(reader.GetOrdinal(column));
        }

        /// <summary>
        ///  Get a nullable integer from a data reader object and gracefully handle NULL values.
        /// </summary>
        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
        /// <param name="column">The name of the column from the result set referred to by the reader.</param>
        /// <returns>The value of the given column or null.</returns>
        public static int? GetNullableInt(SqlDataReader reader, string column)
        {
            int ordinal = reader.GetOrdinal(column);
            return reader.IsDBNull(ordinal) ? (int?)null : reader.GetInt32(ordinal);
        }

        /// <summary>
        ///  Get a nullable DateTime from a data reader object and gracefully handle NULL values.
        /// </summary>
        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
        /// <param name="column">The name of the column from the result set referred to by the reader.</param>
        /// <returns>The value of the given column or null.</returns>
        public static DateTime? GetNullableDateTime(SqlDataReader reader, string column)
        {
            int ordinal = reader.GetOrdinal(column);
            return reader.IsDBNull(ordinal) ? (DateTime?)null : reader.GetDateTime(ordinal);
        }

        /// <summary>
        ///  Determine if the value a given column is NULL.
        /// </summary>
        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
        /// <param name="column">The name of the column from the result set referred to by the reader.</param>
        /// <returns>true if "column" is NULL in the database otherwise false.</returns>
        //public static bool IsDbNull(SqlDataReader reader, string column)
        //{
        //    return reader.IsDBNull(reader.GetOrdinal(column));
        //}
        public static bool IsDbNull(SqlDataReader reader, string column)
        {
            if (reader == null || !reader.HasRows)
            {
                return true; // Return true if there are no rows to read
            }
            else
            {
                try
                {
                    return reader.IsDBNull(reader.GetOrdinal(column));
                }
                catch (Exception ex)
                {
                    // Handle any exceptions that may occur
                    Console.WriteLine("Error: " + ex.Message);
                    return true;
                }
            }
        }
        /// <summary>
        ///  Determine if the value a given column is not NULL.
        /// </summary>
        /// <param name="reader">A SqlDataReader that has not exhausted its result set.</param>
        /// <param name="column">The name of the column from the result set referred to by the reader.</param>
        /// <returns>true if "column" is not NULL in the database otherwise false.</returns>
        public static bool IsNotDbNull(SqlDataReader reader, string column)
        {
            return !IsDbNull(reader, column);
        }

        /// <summary>
        ///  Add a parameter to the given SqlCommand object and gracefully handle null values.
        /// </summary>
        /// <param name="cmd">The command to which to add the parameter.</param>
        /// <param name="name">The name of the parameter.</param>
        /// <param name="value">The value of the parameter. May be null.</param>
        public static void AddParameter(SqlCommand cmd, string name, object value)
        {
            cmd.Parameters.AddWithValue(name, value ?? DBNull.Value);
        }

        public static object ValueOrDBNull(object value)
        {
            return value ?? DBNull.Value;
        }

        public static string GetString(SqlDataReader reader, string column)
        {
            int ordinal = reader.GetOrdinal(column);
            return reader.IsDBNull(ordinal) ? null : reader.GetString(ordinal);
        }
    }
}
//using System;
//using Microsoft.Data.SqlClient;

//namespace Mousai.Utils
//{
//    /// <summary>
//    ///  A set of useful function for interacting with ADO.NET
//    /// </summary>
//    public static class DbUtils
//    {
//        /// <summary>
//        ///  Get a string from a data reader object and gracefully handle NULL values
//        /// </summary>
//        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
//        /// <param name="column">The name of the column from the result set refereed to by the reader.</param>
//        /// <returns>The value of the given column or null.</returns>
//        public static string GetString(SqlDataReader reader, string column)
//        {
//            var ordinal = reader.GetOrdinal(column);
//            if (reader.IsDBNull(ordinal))
//            {
//                return null;
//            }

//            return reader.GetString(ordinal);
//        }
//        //public static string GetString(SqlDataReader reader, string column)
//        //{
//        //    var ordinal = reader.GetOrdinal(column);
//        //    if (reader.IsDBNull(ordinal))
//        //    {
//        //        return null;
//        //    }

//        //    if (reader.Read())
//        //    {
//        //        return reader.GetString(ordinal);
//        //    }

//        //    return null;
//        //}
//        public static string GetNullableString(SqlDataReader reader, string column)
//        {
//            var ordinal = reader.GetOrdinal(column);
//            if (reader.IsDBNull(ordinal))
//            {
//                return null;
//            }
//            return reader.GetString(ordinal);
//        }

//        /// <summary>
//        ///  Get an int from a data reader object.
//        ///  This method assumes the value is not NULL.
//        /// </summary>
//        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
//        /// <param name="column">The name of the column from the result set refereed to by the reader.</param>
//        /// <returns>The value of the given column.</returns>
//        public static int GetInt(SqlDataReader reader, string column)
//        {
//            return reader.GetInt32(reader.GetOrdinal(column));
//        }

//        /// <summary>
//        ///  Get a DateTime from a data reader object.
//        ///  This method assumes the value is not NULL.
//        /// </summary>
//        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
//        /// <param name="column">The name of the column from the result set refereed to by the reader.</param>
//        /// <returns>The value of the given column.</returns>
//        public static DateTime GetDateTime(SqlDataReader reader, string column)
//        {
//            return reader.GetDateTime(reader.GetOrdinal(column));
//        }

//        /// <summary>
//        ///  Get an int? (nullable int) from a data reader object and gracefully handle NULL values
//        /// </summary>
//        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
//        /// <param name="column">The name of the column from the result set refereed to by the reader.</param>
//        /// <returns>The value of the given column or null.</returns>
//        public static int? GetNullableInt(SqlDataReader reader, string column)
//        {
//            var ordinal = reader.GetOrdinal(column);
//            if (reader.IsDBNull(ordinal))
//            {
//                return null;
//            }

//            return reader.GetInt32(ordinal);
//        }

//        /// <summary>
//        ///  Get a DateTime? (nullable DateTime) from a data reader object and gracefully handle NULL values
//        /// </summary>
//        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
//        /// <param name="column">The name of the column from the result set refereed to by the reader.</param>
//        /// <returns>The value of the given column or null.</returns>

//        public static DateTime? GetNullableDateTime(SqlDataReader reader, string column)
//        {
//            var ordinal = reader.GetOrdinal(column);
//            if (reader.IsDBNull(ordinal))
//            {
//                return null;
//            }
//            return reader.GetDateTime(ordinal);
//        }


//        /// <summary>
//        ///  Determine if the value a given column is NULL
//        /// </summary>
//        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
//        /// <param name="column">The name of the column from the result set refereed to by the reader.</param>
//        /// <returns>true if "column" is NULL in the database otherwise false.</returns>
//        public static bool IsDbNull(SqlDataReader reader, string column)
//        {
//            return reader.IsDBNull(reader.GetOrdinal(column));
//        }

//        /// <summary>
//        ///  Determine if the value a given column is not NULL
//        /// </summary>
//        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
//        /// <param name="column">The name of the column from the result set refereed to by the reader.</param>
//        /// <returns>true if "column" is not NULL in the database otherwise false.</returns>
//        public static bool IsNotDbNull(SqlDataReader reader, string column)
//        {
//            return !IsDbNull(reader, column);
//        }

//        /// <summary>
//        ///  Add a parameter to the given SqlCommand object and gracefully handle null values.
//        /// </summary>
//        /// <param name="cmd">The command to which to add the parameter.</param>
//        /// <param name="name">The name of the parameter.</param>
//        /// <param name="value">The value of the parameter. May be null.</param>
//        public static void AddParameter(SqlCommand cmd, string name, object value)
//        {
//            if (value == null)
//            {
//                cmd.Parameters.AddWithValue(name, DBNull.Value);
//            }
//            else
//            {
//                cmd.Parameters.AddWithValue(name, value);
//            }
//        }

//        public static object ValueOrDBNull(object value)
//        {
//            return value ?? DBNull.Value;
//        }
//    }
//}