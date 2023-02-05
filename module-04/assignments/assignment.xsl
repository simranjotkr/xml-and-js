<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
   <xsl:template match="/">
   <html>
        <body>
            <h1>Catalog</h1>
            <ol>
                <xsl:for-each select="catalog/product">
                    <article>
                        <h3><xsl:value-of select="@product_id" /></h3>
                        <p><xsl:value-of select="@description" /></p>
                        <table border="1px">
                            <tr>
                                <th>Item Number</th>
                                <th>Price</th>
                                <th>Gender</th>
                                <th>Small</th>
                                <th>Medium</th>
                                <th>Large</th>
                                <th>Extra Large</th>
                            </tr>
                            <xsl:for-each select="catalog_item">
                                <tr>
                                    <td><xsl:value-of select="item_number" /></td>
                                    <td><xsl:value-of select="price" /></td>
                                    <xsl:if test="@gender='Men'">
                                        <td>M</td>
                                    </xsl:if>
                                    <xsl:if test="@gender='Women'">
                                        <td>W</td>
                                    </xsl:if>
                                    <td>
                                        <xsl:if test="size[@description='Small']">
                                            <table border="1px">
                                                <tr>
                                                    <th>Color</th>
                                                    <th>Image</th>
                                                </tr>
                                                <xsl:for-each select="size[@description='Small']/color_swatch">
                                                    <tr>
                                                        <td><xsl:value-of select="text()" /></td>
                                                        <td><xsl:value-of select="@image" /></td>
                                                    </tr>
                                                </xsl:for-each>
                                            </table>
                                        </xsl:if>
                                    </td>
                                    <td>
                                        <xsl:if test="size[@description='Medium']">
                                            <table border="1px">
                                                <tr>
                                                    <th>Color</th>
                                                    <th>Image</th>
                                                </tr>
                                                <xsl:for-each select="size[@description='Medium']/color_swatch">
                                                    <tr>
                                                        <td><xsl:value-of select="text()" /></td>
                                                        <td><xsl:value-of select="@image" /></td>
                                                    </tr>
                                                </xsl:for-each>
                                            </table>
                                        </xsl:if>
                                    </td>
                                    <td>
                                        <xsl:if test="size[@description='Large']">
                                            <table border="1px">
                                                <tr>
                                                    <th>Color</th>
                                                    <th>Image</th>
                                                </tr>
                                                <xsl:for-each select="size[@description='Large']/color_swatch">
                                                    <tr>
                                                        <td><xsl:value-of select="text()" /></td>
                                                        <td><xsl:value-of select="@image" /></td>
                                                    </tr>
                                                </xsl:for-each>
                                            </table>
                                        </xsl:if>
                                    </td>
                                    <td>
                                        <xsl:if test="size[@description='Extra Large']">
                                            <table border="1px">
                                                <tr>
                                                    <th>Color</th>
                                                    <th>Image</th>
                                                </tr>
                                                <xsl:for-each select="size[@description='Extra Large']/color_swatch">
                                                    <tr>
                                                        <td><xsl:value-of select="text()" /></td>
                                                        <td><xsl:value-of select="@image" /></td>
                                                    </tr>
                                                </xsl:for-each>
                                            </table>
                                        </xsl:if>
                                    </td>                                                                                                            
                                </tr>
                            </xsl:for-each>
                        </table>
                    </article>
                </xsl:for-each>
            </ol>
        </body>
   </html>
   </xsl:template>
</xsl:stylesheet>